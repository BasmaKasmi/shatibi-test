"use client";

import Button from "@/components/Button";
import Emargement from "@/components/Emargement";
import SectionTitle from "@/components/SectionTitle";
import NextCourse from "@/components/NextCourse";
import BackendApi from "@/lib/backend-api";
import { displayToday } from "@/lib/dates";
import { groupEmargementsByDate } from "@/lib/emargements";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import FloatingMenu from "@/components/FloatingMenu";
import DeclareAp from "@/components/DeclareAp";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  capitalizeFirstLetter,
  sortEmargementsByDateDesc,
} from "@/lib/format-utils";
import { removeLastLetter } from "@/lib/format-utils";
import Arrow from "@/public/assets/calendarHeaderControl.svg";
import Image from "next/image";

export default function Home() {
  const username =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("username")
      : null;
  const formattedUsername = username ? capitalizeFirstLetter(username) : "";
  const usernameWithoutLastLetter = removeLastLetter(formattedUsername);

  const getEmargementsNonFaits = async () => {
    const response = await BackendApi.get("teacher/attendance/no/validate");
    console.log("Fetched non-validated attendances:", response.data);
    return response.data;
  };

  const router = useRouter();

  const getNextCourse = async () => {
    const response = await BackendApi.get("teacher/attendance/incoming");

    return response.data;
  };

  const [opened, { open, close }] = useDisclosure(false);

  const getFlattenedNextCourses = (nextCourseApiResult: any) => {
    try {
      const flatCourses = nextCourseApiResult.result
        .map(({ id, name, slot, classroom, date_list }: any) =>
          date_list.map(
            ({ date, start_time, end_time, session, validate }: any) => ({
              id,
              name,
              start_time,
              end_time,
              session,
              validate,
              slot,
              classroom,
              date,
            })
          )
        )
        .flat();

      const sortedCourses = flatCourses.sort((a: any, b: any) =>
        a.start_time.localeCompare(b.start_time)
      );

      return sortedCourses;
    } catch {
      return [];
    }
  };

  const {
    data: nextCourses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["PROCHAIN_COURS"],
    queryFn: getNextCourse,
  });

  const flattenedAndSortedCourses = nextCourses
    ? getFlattenedNextCourses(nextCourses)
    : [];

  const { data, isLoading: isLoadingEmargements } = useQuery({
    queryKey: ["EMARGEMENT_NON_FAIT"],
    queryFn: getEmargementsNonFaits,
  });

  const emargementsNonFaitsGroupedByCourse = data?.result ?? [];

 const emargementsNonFaitsAsFlatList = emargementsNonFaitsGroupedByCourse
  .map(({ date_list, id, name, slot }: any) =>
    date_list.map(({ date, time, session }: any) => ({
      date,
      time,
      session,
      id,
      name,
      slot,
    }))
  )
  .flat()
  .sort((a:any, b:any) => {
    const dateTimeA = `${a.date}T${a.time}`;
    const dateTimeB = `${b.date}T${b.time}`;

    return dateTimeB.localeCompare(dateTimeA);
  });



  const emargementsTri = sortEmargementsByDateDesc(
    emargementsNonFaitsAsFlatList
  );

  const emargementsNonFaitsGroupedByDate =
    groupEmargementsByDate(emargementsTri);

  let firstEmargementNonFait: any;

  if (Object.keys(emargementsNonFaitsGroupedByDate).length > 0) {
    firstEmargementNonFait =
      emargementsNonFaitsGroupedByDate[
        Object.keys(emargementsNonFaitsGroupedByDate)[0]
      ][0];
  }

  if (isLoading) {
    return <p className="pl-6">Chargement...</p>;
  }

  return (
    <div className="md:hidden">
      <Modal
        id="declare-ap"
        opened={opened}
        onClose={close}
        withCloseButton={false}
        radius="lg"
        centered
      >
        <DeclareAp />

        <div className="flex justify-end mt-4">
          <Button
            className="text-shatibi-red bg-shatibi-light-red font-bold py-2 px-8 rounded-full"
            onClick={close}
            variant="red"
          >
            Annuler
          </Button>
        </div>
      </Modal>

      <div className="h-screen flex flex-col gap-3 relative">
        <FloatingMenu />

        <div className="mt-3">
          <SectionTitle title="Tableau de bord" />
        </div>

        <div className="md:hidden flex flex-col p-5 gap-3 flex-grow mb-5 mt-5">
          <div className="pl-3">
            <h2 className="font-semibold text-2xl">
              Bonjour Pr. {usernameWithoutLastLetter}
            </h2>
            <p className="font-normal text-sm pl-0.5">
              Bienvenue dans votre espace personnel
            </p>
          </div>
          <div className="bg-shatibi-red/[.30] rounded-xl p-4">
            <h2 className=" text-center mb-4 font-semibold text-sm">
              {emargementsNonFaitsAsFlatList.length} Emargement(s) non fait(s)
            </h2>

            {firstEmargementNonFait ? (
              <Emargement
                onClick={() =>
                  // @ts-ignore
                  router.push(
                    `emargement?groupId=${firstEmargementNonFait.id}&date=${firstEmargementNonFait.date}&groupName=${firstEmargementNonFait.name}&groupSlot=${firstEmargementNonFait.slot}`
                  )
                }
                emargement={firstEmargementNonFait}
              />
            ) : (
              "Aucun émargement non fait"
            )}
            <div className="text-center">
            <button 
            onClick={() =>
              // @ts-ignore
              router.push(
                `/unmadeAttendance`
              )
            }
            >
            <h2 className=" text-center mt-2 font-semibold text-sm">
                Voir la liste
              </h2>              
            </button>
            </div>
          </div>
          <div className="mt-6">
            <h3 className=" font-semibold text-lg pl-4">
              {displayToday()}
            </h3>

            {!Array.isArray(nextCourses?.result) ||
            nextCourses?.result?.length === 0 ? (
              <p className="text-center mt-4">Pas de cours aujourd&apos;hui</p>
            ) : (
              <div className="px-3">
                {flattenedAndSortedCourses.map((course: any) => (
                  <NextCourse key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>

          <Button
            className="w-fit mx-auto mt-auto"
            onClick={() => open()}
            variant="orange"
          >
            Déclarer une AP
          </Button>
        </div>

        <div className="hidden md:block">
          {/* {Object.entries(emargementsNonFaitsGroupedByDate).map(
            ([date, emargementsForThisDate]) => (
              <div key={String(date)}>
                <h3>{displayDate(date)}</h3>

                {emargementsForThisDate.map((emargement) => (
                  <Emargement key={emargement.date} emargement={emargement} />
                ))}
              </div>
            )
          )} */}
        </div>
      </div>
    </div>
  );
}
