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

  const students = studentsData?.result ?? [];

  const ASSIDUITE_MAPPING = Object.fromEntries(
    students.map(({ nb_ap, nb_ai, id }: any) => [
      id,
      {
        totalAbsences: Number(nb_ap ?? 0) + Number(nb_ai ?? 0),
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
  };
};

export default useGroup;
