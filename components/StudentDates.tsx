import Image from "next/image";
import calendar from "@/public/calendar.svg";
import AP from "@/public/AP.svg";
import Button from "./Button";
import { useQuery } from "@tanstack/react-query";
import BackendApi from "@/lib/backend-api";
import { useState } from "react";
import { displayDate } from "@/lib/dates";
import clsx from "clsx";

interface Attendance {
  id: number;
  date: string;
  validate: boolean;
}
export const getAttendanceList = async (
  groupId: number,
  studentId: number,
  startDate: string,
  endDate: string
): Promise<string[]> => {
  const response = await BackendApi.post(`teacher/attendance/group/student`, {
    group_id: groupId,
    student_id: studentId,
    start_date: startDate,
    end_date: endDate,
  });

  if (response.data.status !== "success") {
    throw new Error(response.data.error);
  }

  return response.data.result;
};

export const StudentDates = ({
  group_id,
  student_id,
  name,
  onClickCancel,
  onClickValidate,
  selectedDates,
  selectedDatesFunctions,
}: {
  group_id: string;
  student_id: string;
  name: string;
  onClickCancel: () => void;
  onClickValidate: () => void;
  selectedDates: string[];
  selectedDatesFunctions: any;
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const {
    data: attendanceList,
    isLoading,
    isError,
    error,
  } = useQuery<string[], Error>({
    queryKey: ["attendanceList", group_id, student_id, startDate, endDate],
    queryFn: () =>
      getAttendanceList(
        Number(group_id),
        Number(student_id),
        startDate,
        endDate
      ),
    enabled: !!group_id,
  });

  const addOrRemoveDateToSelected = (date: string) => {
    if (selectedDates.includes(date)) {
      selectedDatesFunctions.removeAt(
        selectedDates.findIndex((d) => d === date)
      );
    } else {
      selectedDatesFunctions.push(date);
    }
  };

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="relative p-2 justify-items-center flex flex-col items-center overflow-hidden">
      <h2 className="text-center text-lg font-semibold text-black mb-8">
        {name}
      </h2>
      <div className="mb-4 bg-white rounded-xl shadow w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 h-24 mx-auto">
        <div className="flex gap-2 pl-4 place-items-center">
          <Image className="mt-2" src={calendar} alt="User" />

          <label
            htmlFor="searchStudentByName"
            className="block text-sm font-semibold mt-2"
          >
            Choisir dates :
          </label>
        </div>

        <div className="flex justify-center gap-4">
          <input
            id="start_date"
            type="date"
            className="w-2/5 p-2 border rounded-full mt-2 text-xs text-center"
            value={startDate || ""}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            id="end_date"
            type="date"
            className="w-2/5 p-2 px-2 border rounded-full mt-2 text-xs text-center"
            value={endDate || ""}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4 bg-white rounded-xl shadow w-full h-64 sm:h-64 md:h-96 lg:h-80 xl:h-96">
        <div className="flex gap-2 pl-4 place-items-center text-sm font-semibold mt-3">
          <Image src={AP} alt="User" />
          Sélectionner les dates :
        </div>
        <div className="flex flex-col gap-2 p-5 max-h-[78%] overflow-scroll">
          {isLoading ? (
            <p>Chargement...</p>
          ) : (
            attendanceList?.map((date) => (
              <div
                key={date}
                className={clsx(
                  "p-2 last:mb-0 shadow rounded-lg cursor-pointer",
                  selectedDates.includes(date)
                    ? "bg-shatibi-red/[.15]"
                    : "bg-white"
                )}
                onClick={() => addOrRemoveDateToSelected(date)}
              >
                <p className="text-[14px] font-semibold">{displayDate(date)}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-center gap-6 w-full mt-4">
        <Button
          className="text-shatibi-green bg-shatibi-light-green font-bold py-2 px-8 rounded-full"
          variant="green"
          onClick={onClickValidate}
        >
          Valider
        </Button>
        <Button
          className="bg-shatibi-red/[.15] text-shatibi-red font-bold py-2 px-8 rounded-full"
          variant="red"
          onClick={onClickCancel}
        >
          Annuler
        </Button>
      </div>
    </div>
  );
};
