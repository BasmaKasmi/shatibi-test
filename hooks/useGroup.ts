import BackendApi from "@/lib/backend-api";
import { useQuery } from "@tanstack/react-query";

const getStudents = async (groupId: number) => {
  const response = await BackendApi.get(
    `teacher/${groupId}/student/list/group`
  );

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

const useGroup = ({ groupId, date }: { groupId: number; date: string }) => {
  const { data: studentsDataForDate, isLoading: isLoadingForDate } = useQuery({
    queryKey: ["GROUP_STUDENTS", groupId, date],
    queryFn: () => getPresences(groupId, date),
  });

  const { data: studentsData, isLoading } = useQuery({
    queryKey: ["GROUP_STUDENTS", groupId],
    queryFn: () => getStudents(groupId),
  });

  console.log("Students Data for Date:", studentsDataForDate);

  const students = studentsData?.result ?? [];

  console.log("Students Data:", studentsData?.result);


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

  console.log("ASSIDUITE_MAPPING:", ASSIDUITE_MAPPING);


  const getTotalAbsences = (studentId: number) => {
    try {
      return ASSIDUITE_MAPPING[studentId].totalAbsences;
    } catch {
      return 0;
    }
  };

  const getStudentStatistics = (studentId: number) => {
    try {
      return ASSIDUITE_MAPPING[studentId];
    } catch {
      return {};
    }
  };

  const statistics = {
    inscrits: students.length,
    abandons: 0,
    presence: 0,
    progression: 0,
  };


  
  return {
    isLoading,
    students,
    studentsForDate: studentsDataForDate?.result ?? [],
    isLoadingForDate,
    getTotalAbsences,
    statistics,
    getStudentStatistics,
  };
};

export default useGroup;
