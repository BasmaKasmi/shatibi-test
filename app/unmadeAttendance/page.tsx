"use client";
import { useRouter } from 'next/navigation';
import Button from "@/components/Button";
import SectionTitle from "@/components/SectionTitle";
import Emargement from '@/components/Emargement';
import { useQuery } from '@tanstack/react-query';
import BackendApi from '@/lib/backend-api';

const UnmadeAttendancePage = () => {
  const getEmargementsNonFaits = async () => {
    const response = await BackendApi.get("teacher/attendance/no/validate");
    console.log("Fetched non-validated attendances:", response.data);
    return response.data;
  };

  const router = useRouter();


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

  const emargementsTri = emargementsNonFaitsAsFlatList;


  return (
    <div style={{ paddingBottom: "env(safe-area-inset-bottom)" }} className="h-screen flex flex-col relative overflow-hidden md:hidden ">
        <div className="pt-3 flex-shrink-0">
            <SectionTitle title="Emargement" />
        </div>
        <Button className="h-7 text-sm absolute right-2 top-3" onClick={() => router.back()} variant="red">
        Annuler
      </Button>
      <div className="flex flex-col p-5">
      <div className="bg-shatibi-red/[.30] rounded-xl p-3 mt-3">
            <h2 className=" text-center font-semibold text-sm">
              {emargementsNonFaitsAsFlatList.length} Emargement(s) non fait(s)
            </h2>
            <div className="flex flex-col gap-2 p-5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 18vh)' }}>
                {emargementsTri.map((emargement: any) => (
                <Emargement 
                key={`${emargement.id}-${emargement.date}-${emargement.time}`}
                emargement={emargement}
                onClick={() =>
                    // @ts-ignore
                    router.push(
                      `emargement?groupId=${emargement.id}&date=${emargement.date}&groupName=${emargement.name}&groupSlot=${emargement.slot}`
                    )
                  }
                />
                ))}
            </div>
      </div>
    </div>
    </div>

  );
};

export default UnmadeAttendancePage;
