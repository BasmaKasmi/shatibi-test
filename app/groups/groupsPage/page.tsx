"use client";

import Button from "@/components/Button";
import SectionTitle from "@/components/SectionTitle";
import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import BackendApi from "@/lib/backend-api";
import { formatCourseName } from "@/lib/format-utils";
import { formatDayToThreeLetters, sortGroupsByDay } from "@/lib/dates";

const getGroups = async () => {
  const response = await BackendApi.get("teacher/group/list/year");
  if (response.data.status !== "success") {
    throw new Error(response.data.error);
  }
  return response.data.result;
};

const GroupsPage = () => {
  const router = useRouter();

  interface Group {
    id: number;
    name: string;
    slot: string;
    session: string;
  }

  const {
    data: groups,
    isLoading,
    isError,
    error,
  } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur: {error.message}</div>;

  const sortedGroups = groups ? sortGroupsByDay(groups) : [];

  return (
    <div className="h-screen flex flex-col gap-3 relative overflow-hidden md:hidden">
      <div className="mt-3">
        <SectionTitle title="Mes groupes" />
      </div>

      <Button
        className="h-7 text-sm absolute right-4 top-3"
        onClick={() => router.back()}
        variant="red"
      >
        Retour
      </Button>

      <div>
        <h2 className="md:hidden text-xl font-semibold ml-6 mt-8">
          Mes groupes :
        </h2>

        <div className="flex flex-col items-center justify-center mt-2 overflow-y-auto">
          {sortedGroups?.map((group) => (
            <div
              key={group.id}
              onClick={() =>
                // @ts-ignore
                router.push(
                  `studentsPage?groupId=${group.id}&groupName=${group.name}&groupSlot=${group.slot}`
                )
              }
              className="px-6 py-2 bg-white shadow-md rounded-lg w-[90%] mb-3 mx-auto"
            >
              <p className="text-[14px] font-semibold">
                {formatCourseName(group.name)}
              </p>
              <p className="text-xs font-light">{formatDayToThreeLetters(group.slot)}</p>
            </div>
          ))}
          {!groups ||
            (groups.length === 0 && <div>Pas de groupes à afficher</div>)}
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
