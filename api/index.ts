import BackendApi from "@/lib/backend-api";

export interface Attendance {
  id: number;
  date: string;
  validate: boolean;
}

export const getAttendanceList = async (
  groupId: number
): Promise<Attendance[]> => {
  const response = await BackendApi.get(
    `teacher/${groupId}/attendance/list/group`
  );
  if (response.data.status !== "success") {
    throw new Error(response.data.error);
  }
  return response.data.result;
};
