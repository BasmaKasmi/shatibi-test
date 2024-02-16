"use client";

import Image from "next/image";
import Button from "@/components/Button";
import calendar from "@/public/calendar.svg";

import SectionTitle from "@/components/SectionTitle";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { displayDate, formatDayToThreeLetters } from "@/lib/dates";
import clsx from "clsx";
import { formatCourseName } from "@/lib/format-utils";
import { Attendance, getAttendanceList } from "@/api";

const WeeksPage = () => {
  const router = useRouter();
  const search = useSearchParams();
  const groupId = Number(search.get("groupId"));
  const groupName = search.get("groupName");
  const groupSlot = search.get("groupSlot");
  const encodedGroupName = encodeURIComponent(groupName ?? "");
  const encodedGroupSlot = encodeURIComponent(groupSlot ?? "");

  const {
    data: attendanceList,
    isLoading,
    isError,
    error,
  } = useQuery<Attendance[], Error>({
    queryKey: ["attendanceList", groupId],
    queryFn: () => getAttendanceList(groupId),
    enabled: !!groupId,
    select: (data) => data.slice(0, 5),
  });

  return (
    <div className="h-screen flex flex-col gap-3 relative overflow-hidden md:hidden">
      <div className="mt-3">
        <SectionTitle title="Mes émargements" />
      </div>

      <Button
        className="h-7 text-sm absolute right-4 top-3"
        onClick={() => router.back()}
        variant="red"
      >
        Retour
      </Button>
      {groupName && groupSlot && (
        <div>
          <h1 className="text-xl font-bold text-center mt-6">
            {formatCourseName(groupName)}
          </h1>
          <p className="text-md font-semibold text-center">
            {formatDayToThreeLetters(groupSlot)}
          </p>
        </div>
      )}
      <div className="flex flex-col mt-6 w-full sm:w-11/12 md:w-10/12">
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
          />
          <input
            id="end_date"
            type="date"
            className="w-2/5 p-2 px-2 border rounded-full mt-2 text-xs text-center"
          />
        </div>
      </div>
      <h2 className="md:hidden text-xl font-semibold ml-6 mt-6">Mes dates :</h2>
      <div className="flex flex-col items-center justify-center mt-2 min-h-[33%] max-h-[60%] overflow-y-auto">
        {attendanceList?.map((attendance) => (
          <div
            key={attendance.id}
            onClick={() =>
              // @ts-ignore
              router.push(
                `/emargement?groupId=${groupId}&date=${attendance.date}&groupName=${encodedGroupName}&groupSlot=${encodedGroupSlot}`
              )
            }
            className="p-2 bg-white shadow-md rounded-lg w-[90%] mt-2 mb-2"
          >
            <div className="flex justify-between items-center w-full">
              <p className="mr-4 px-3 py-1 text-sm font-semibold ">
                {displayDate(attendance.date)}
              </p>
              <p
                className={clsx(
                  "px-3 py-1 rounded-full text-sm font-semibold",
                  {
                    " text-shatibi-green": attendance.validate,
                    "text-shatibi-red": !attendance.validate,
                  }
                )}
              >
                {attendance.validate ? "Fait" : "Non fait"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeksPage;
