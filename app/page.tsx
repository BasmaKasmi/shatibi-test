"use client";

import Button from "@/components/Button";
import Emargement from "@/components/Emargement";
import SectionTitle from "@/components/SectionTitle";
import NextCourse from "@/components/NextCourse";
import BackendApi from "@/lib/backend-api";
import { displayDate, displayToday } from "@/lib/dates";
import { groupEmargementsByDate } from "@/lib/emargements";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import FloatingMenu from "@/components/FloatingMenu";
import DeclareAp from "@/components/DeclareAp";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Home() {
  const getEmargementsNonFaits = async () => {
    const response = await BackendApi.get("teacher/attendance/no/validate");

    return response.data;
  };

  const router = useRouter();

  const getNextCourse = async () => {
    const response = await BackendApi.get("teacher/attendance/incoming");

    return response.data;
  };

  const { data } = useQuery({
    queryKey: ["EMARGEMENT NON FAIT"],
    queryFn: getEmargementsNonFaits,
  });

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

  const emargementsNonFaits = data?.result ?? [];

  const emargementsNonFaitsGroupedByDate =
    groupEmargementsByDate(emargementsNonFaits);

  let firstEmargementNonFait: any;

  if (Object.keys(emargementsNonFaitsGroupedByDate).length > 0) {
    firstEmargementNonFait =
      emargementsNonFaitsGroupedByDate[
        Object.keys(emargementsNonFaitsGroupedByDate)[0]
      ][0];
  }

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <Modal opened={opened} onClose={close} withCloseButton={false} radius='lg' centered>
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
          <div className="bg-shatibi-red/[.30] rounded-xl p-4">
            <h2 className=" text-center mb-4 font-semibold text-sm">
              Emargement(s) non fait(s)
            </h2>

            {firstEmargementNonFait ? (
              <Emargement
                onClick={() =>
                  // @ts-ignore
                  router.push(
                    `emargement?groupId=${firstEmargementNonFait.groupId}&date=${firstEmargementNonFait.date}`
                  )
                }
                emargement={firstEmargementNonFait}
              />
            ) : (
              "Aucun émargement non fait"
            )}
          </div>
          <div>
            <h3 className=" font-semibold text-lg leading-6">
              {displayToday()}
            </h3>

            {!Array.isArray(nextCourses?.result) ||
            nextCourses?.result?.length === 0 ? (
              <p className="text-center mt-4">Pas de cours aujourd&apos;hui</p>
            ) : (
              <div className="p-6">
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
          {Object.entries(emargementsNonFaitsGroupedByDate).map(
            ([date, emargementsForThisDate]) => (
              <div key={String(date)}>
                <h3>{displayDate(date)}</h3>

                {emargementsForThisDate.map((emargement) => (
                  <Emargement key={emargement.date} emargement={emargement} />
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
