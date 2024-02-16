import BackendApi from "@/lib/backend-api";
import { useQuery } from "@tanstack/react-query";

interface CourseSession {
  date: string;
  session: string;
}

interface Course {
  id: number;
  name: string;
  classroom: string;
  date_list: CourseSession[];
}

const getStudents = async (groupId: number) => {
  const response = await BackendApi.get(
    `teacher/${groupId}/student/list/group`
  );
  console.log(`Response from getStudents API for group ${groupId}:`, response);

  return response.data;
};

const getPresences = async (groupId: number, date: string) => {
  const response = await BackendApi.post(
    "teacher/attendance/student/list/group",
    {
      group_id: groupId,
      date,
    }
  );

  return response.data;
};

const getNextCourses = async () => {
  try {
    const response = await BackendApi.get("teacher/attendance/incoming");
    if (response.data.status === "success") {
      return response.data.result;
    } else {
      throw new Error(response.data.error);
    }
  } catch (error) {
    return [];
  }
};

const calculateSessions = (nextCoursesData: Course[]): [number, number] => {
  let totalRealized = 0;
  let totalPlanned = new Set<number>();

  nextCoursesData.forEach((course) => {
    course.date_list.forEach(({ session }) => {
      const [realized, total] = session.split("/").map(Number);
      totalRealized += realized;
      totalPlanned.add(total);
    });
  });

  const maxTotal = Math.max(...Array.from(totalPlanned));
  console.log("Total Realized Sessions:", totalRealized);
  console.log("Total Planned Sessions:", maxTotal);
  return [totalRealized, maxTotal];
};

const useGroup = ({ groupId, date }: { groupId: number; date: string }) => {
  const groupQueryEnabled = !!groupId;

  const { data: studentsDataForDate, isLoading: isLoadingForDate } = useQuery({
    queryKey: ["GROUP_STUDENTS", groupId, date],
    queryFn: () => getPresences(groupId, date),
  });

  const { data: nextCoursesData, isLoading: isLoadingNextCourses } = useQuery({
    queryKey: ["NEXT_COURSES", groupId],
    queryFn: getNextCourses,
  });

  const { data: studentsData, isLoading } = useQuery({
    queryKey: ["GROUP_STUDENTS", groupId],
    queryFn: () => getStudents(groupId),
  });

  let realizedSessions = 0;
  let totalSessions = 0;

  if (nextCoursesData) {
    [realizedSessions, totalSessions] = calculateSessions(nextCoursesData);
  }

  const students = studentsData?.result ?? [];
  console.log("Students array:", students);

  const ASSIDUITE_MAPPING = Object.fromEntries(
    students.map(({ nb_ap, nb_ai, id, name }: any) => [
      id,
      {
        id,
        name,
        totalAbsences: Number(nb_ap ?? 0) + Number(nb_ai ?? 0),
        ai: Number(nb_ai),
        ap: Number(nb_ap),
        presencePercentage: 0,
      },
    ])
  );

  const getTotalAbsences = (studentId: number) => {
    try {
      return ASSIDUITE_MAPPING[studentId].totalAbsences;
    } catch {
      return 0;
    }
  };

  // pour chaque etudiant, il nous faut le pourcentage de presence pour ce cours

  // cela nous fait un array de taux de presence

  // il faut faire la moyenne de cet array

  const calculateStudentPercentage = (
    studentId: number,
    realizedSessions: number
  ): number => {
    const totalAbsences = getTotalAbsences(studentId);
    console.log(`Total Absences for student ${studentId}:`, totalAbsences);

    const presence = realizedSessions - totalAbsences;
    console.log(`Presence for student ${studentId}:`, presence);

    const studentPercentage = (presence / realizedSessions) * 100;
    console.log(
      `Student Percentage for student ${studentId} before rounding:`,
      studentPercentage
    );

    return Math.round(studentPercentage);
  };

  const calculateGroupPresence = (
    realizedSessions: number,
    students: any[]
  ) => {
    if (realizedSessions === 0 || students.length === 0) return 0;

    const totalAbsences = students.reduce(
      (total, { nb_ap, nb_ai }) => total + (nb_ap ?? 0) + (nb_ai ?? 0),
      0
    );
    const totalPresence = realizedSessions * students.length - totalAbsences;
    const groupPresence =
      (totalPresence / (realizedSessions * students.length)) * 100;

    console.log("Total Absences:", totalAbsences);
    console.log("Total Presence:", totalPresence);
    console.log("Calculated Group Presence:", groupPresence);
    return Math.trunc(groupPresence);
  };

  const groupPresence = calculateGroupPresence(realizedSessions, students);

  if (nextCoursesData && students.length > 0) {
    students.forEach((student: any) => {
      const studentPercentage = calculateStudentPercentage(
        student.id,
        realizedSessions
      );

      const studentStats = ASSIDUITE_MAPPING[student.id] || {};
      studentStats.presencePercentage = studentPercentage;
      ASSIDUITE_MAPPING[student.id] = studentStats;
    });
  }

  const getStudentStatistics = (studentId: number) => {
    try {
      return ASSIDUITE_MAPPING[studentId];
    } catch {
      return {};
    }
  };

  let progression = "0/0";

  if (
    nextCoursesData &&
    nextCoursesData.length > 0 &&
    nextCoursesData[0].date_list.length > 0
  ) {
    progression = nextCoursesData[0].date_list[0].session;
  }

  const statistics = {
    inscrits: students.length,
    abandons: 0,
    groupPresence,
    progression,
  };

  return {
    isLoading,
    students,
    studentsForDate: studentsDataForDate?.result ?? [],
    isLoadingForDate,
    getTotalAbsences,
    statistics,
    getStudentStatistics,
    realizedSessions,
    totalSessions,
  };
};

export default useGroup;
