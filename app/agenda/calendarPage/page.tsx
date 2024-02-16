"use client";

import { useState } from "react";
import Button from "@/components/Button";
import CalendarComponent, {
  computeColorHexFromString,
} from "@/components/Calendar";
import SectionTitle from "@/components/SectionTitle";
import { useRouter } from "next/navigation";
import { useQueries, useQuery } from "@tanstack/react-query";
import BackendApi from "@/lib/backend-api";
import { formatCourseName } from "@/lib/format-utils";
import { formatDayToThreeLetters, sortGroupsByDay } from "@/lib/dates";
import { getAttendanceList } from "@/api";

/** @ref https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_uniqwith */
const uniqWith = (arr: any[], fn: any) =>
  arr.filter(
    (element, index) => arr.findIndex((step) => fn(element, step)) === index
  );

interface Group {
  id: number;
  name: string;
  slot: string;
  session: string;
}

const getGroups = async (): Promise<Group[]> => {
  const response = await BackendApi.get("teacher/group/list/year");
  if (response.data.status !== "success") {
    throw new Error(response.data.error);
  }
  return response.data.result;
};

const CalendarPage = () => {
  const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);
  const router = useRouter();

  const handleClick = (groupId: number) => {
    setSelectedGroupIds((prevSelectedGroupIds) => {
      if (prevSelectedGroupIds.includes(groupId)) {
        return prevSelectedGroupIds.filter((id) => id !== groupId);
      } else {
        return [...prevSelectedGroupIds, groupId];
      }
    });
  };

  const {
    data: groups,
    isLoading,
    isError,
    error,
  } = useQuery<Group[], Error>({
    queryKey: ["groups"],
    queryFn: getGroups,
    initialData: [],
  });

  const results = useQueries({
    queries:
      groups?.map((group) => ({
        queryKey: ["attendanceList", group.id],
        queryFn: () => getAttendanceList(group.id),
        staleTime: Infinity,
      })) ?? [],
  });

  let formattedDaysToHighlight = results
    .map(({ data }, index) =>
      (data ?? []).map(({ id, validate, date }) => ({
        id,
        validate,
        groupId: groups[index].id,
        date: new Date(date),
      }))
    )
    .flat();

  formattedDaysToHighlight = uniqWith(
    formattedDaysToHighlight,
    (a: any, b: any) => a.id === b.id && a.date.getTime() === b.date.getTime()
  );

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur: {error?.message}</div>;

  const sortedGroups = groups ? sortGroupsByDay(groups) : [];

  return (
    <div className="h-screen flex flex-col gap-3 relative overflow-hidden md:hidden">
      <div className="mt-3">
        <SectionTitle title="Mon agenda" />
      </div>

      <Button
        className="h-7 text-sm absolute right-4 top-3"
        onClick={() => router.back()}
        variant="red"
      >
        Retour
      </Button>
      <CalendarComponent
        daysToHighlight={formattedDaysToHighlight}
        selectedGroupIds={selectedGroupIds}
      />

      <div className="flex flex-col items-center justify-center overflow-y-auto">
        {sortedGroups.map((group) => (
          <div
            key={group.id}
            onClick={() => handleClick(group.id)}
            className={`px-6 py-2 shadow-md rounded-lg w-11/12 mb-1 mx-auto relative
                        ${
                          selectedGroupIds.includes(group.id)
                            ? "bg-shatibi-orange text-white"
                            : "bg-white"
                        }`}
          >
            <div className="flex items-center flex-grow ">
              <p
                className={`text-[14px] font-semibold ${
                  selectedGroupIds.includes(group.id)
                    ? "text-white"
                    : "text-black"
                }`}
              >
                {formatCourseName(group.name)}
              </p>
              <span
                className="inline-block h-4 w-4 rounded-full mr-2 absolute top-5 right-4"
                style={{
                  backgroundColor: computeColorHexFromString(Number(group.id)),
                }}
              ></span>
            </div>
            <p className="text-xs font-light">
              {formatDayToThreeLetters(group.slot)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;