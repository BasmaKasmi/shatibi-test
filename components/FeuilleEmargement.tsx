"use client";

import useGroup from "@/hooks/useGroup";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackendApi from "@/lib/backend-api";
import GroupRecap from "./GroupRecap";
import Image from "next/image";
import user from "@/public/2-User.svg";
import clsx from "clsx";
import { modals } from "@mantine/modals";
import ReactQueryProvider from "@/app/react-query-provider";
import ValiderEmargementModal from "./ValiderEmargementModal";

type Student = {
  id: number;
  name: string;
  absent: boolean;
  motive: string | null;
};

type Props = {
  groupId: number;
  date: string;
};


const AI_AP_CLASSNAMES =
  "shadow-lg w-10 h-10 rounded-full text-shatibi-red flex place-items-center text-center font-bold";

const ApOrAiButton = ({
  apOrAi,
  active,
  onClick,
}: {
  apOrAi: "AP" | "AI";
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={clsx(
        AI_AP_CLASSNAMES,
        active ? "bg-shatibi-red text-white" : "bg-shatibi-red/[.15]"
      )}
      onClick={onClick}
    >
      <p className="w-full">{apOrAi}</p>
    </div>
  );
};

const FeuilleEmargement = ({ groupId, date }: Props) => {
  const { studentsForDate, isLoadingForDate, getTotalAbsences, statistics } =
    useGroup({
      groupId,
      date,
    });

  const queryClient = useQueryClient();

  const declareAp = async (
    studentId: number,
    apOrAiOrPr: "AP" | "AI" | "PR"
  ) => {
    const response = await BackendApi.post("teacher/attendance/set/student", {
      group_id: groupId,
      date,
      student_id: studentId,
      absence: apOrAiOrPr,
    });

    return response.data;
  };

  const validateFeuilleEmargement = async () => {
    if (studentsForDate.length === 0) return;

    const response = await BackendApi.post("teacher/attendance/set/group", {
      group_id: groupId,
      date,
      student_list: studentsForDate.map(({ id, absent, motive }: any) => ({
        student_id: id,
        absence: absent ? motive : "PR",
      })),
    });

    return response.data;
  };

  const getStudentAttendance = async () => {
    if (!groupId || !date || studentsForDate.length === 0) return;

    const studentList = studentsForDate.map(
      ({ id, name, absent, motive }: Student) => ({
        student_id: id,
        name: name,
        absence: absent,
        motive: absent ? motive : null,
      })
    );

    const response = await BackendApi.post(
      "teacher/attendance/student/list/group",
      {
        group_id: groupId,
        date: date,
        student_list: studentList,
      }
    );

    return response.data;
  };

  const { mutate } = useMutation({
    mutationFn: ({
      studentId,
      apOrAi,
    }: {
      studentId: number;
      apOrAi: "AP" | "AI" | "PR";
    }) => declareAp(studentId, apOrAi),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GROUP_STUDENTS"] });
    },
  });


  const { mutate: validateFeuille } = useMutation({
    mutationFn: () => validateFeuilleEmargement(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GROUP_STUDENTS"] });
      queryClient.invalidateQueries({ queryKey: ["PROCHAIN_COURS"] });

    },
  });


  const { mutate: Attendance } = useMutation({
    mutationFn: () => getStudentAttendance(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GROUP_STUDENTS"] });
    },
  });

  if (isLoadingForDate) return <p>Chargement...</p>;

  const handleClickValiderEmargement = () => {
  
    const onValidate = () => {
      validateFeuille();
      modals.closeAll();
    }; 

    const onCancel = () => {
      modals.closeAll();
    };
    modals.openConfirmModal({
      centered: true,
      children: 
      (
        <ReactQueryProvider> 
          <ValiderEmargementModal onValidate={onValidate} onCancel={onCancel} students={studentsForDate} />
        </ReactQueryProvider>
      ),
      labels: { cancel: '', confirm: ''},
      withCloseButton: false,
      confirmProps: { style: { display: 'none' } }, cancelProps: { style: { display: 'none'} },
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-35px)] overflow-hidden">
      <GroupRecap groupRecap={statistics} />
      <div className="flex items-center ml-6 mt-2">
        <Image src={user} alt="nombre d'étudiants" width={17} height={17} />
        <h1 className="text-[14px] font-semibold ml-2">
          Nombre d&apos;étudiants: {studentsForDate.length}
        </h1>
      </div>
      {studentsForDate.length === 0 ? null : (
        <div className="flex flex-col gap-2 p-5 min-h-[33%] max-h-[60%] grow overflow-y-auto">
          {studentsForDate.map(({ name, id, absent, motive }: any) => {
            return (
              <div
                key={id}
                className={clsx(
                  "flex flex-row shadow-md rounded-lg justify-between p-3",
                  { "bg-shatibi-red/[.15]": absent }
                )}
              >
                <div className="ml-5">
                  <p className="text-[14px] font-semibold">{name}</p>
                  <p className="text-xs font-light">
                    Absences: {getTotalAbsences(id)}
                  </p>
                </div>

                {absent ? (
                  <>
                    {motive === "AP" ? (
                      <ApOrAiButton
                        apOrAi="AP"
                        active
                        onClick={() => mutate({ studentId: id, apOrAi: "PR" })}
                      />
                    ) : null}
                    {motive === "AI" ? (
                      <ApOrAiButton
                        apOrAi="AI"
                        active
                        onClick={() => mutate({ studentId: id, apOrAi: "PR" })}
                      />
                    ) : null}
                  </>
                ) : (
                  <div className="flex flex-row gap-4">
                    <ApOrAiButton
                      apOrAi="AP"
                      active={false}
                      onClick={() => mutate({ studentId: id, apOrAi: "AP" })}
                    />

                    <ApOrAiButton
                      apOrAi="AI"
                      active={false}
                      onClick={() => mutate({ studentId: id, apOrAi: "AI" })}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      
      <Button
        className="mt-20 mx-auto self-center font-bold"
        onClick={() => handleClickValiderEmargement()}
        variant="green"
      >
        Valider la feuille d&apos;émargement
      </Button>
    </div>
  );
};

export default FeuilleEmargement;