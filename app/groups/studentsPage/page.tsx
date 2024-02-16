"use client";

import Button from "@/components/Button";
import GroupRecap from "@/components/GroupRecap";
import SectionTitle from "@/components/SectionTitle";
import useGroup from "@/hooks/useGroup";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import user from "@/public/user.svg";
import { useState } from "react";
import { formatCourseName } from "@/lib/format-utils";
import { StudentItem } from "@/app/liste-etudiants/components";
import { Modal } from "@mantine/core";
import { StudentModalContentWrapper } from "@/app/emargement/components";
import { formatDayToThreeLetters } from "@/lib/dates";

const StudentsPage = () => {
  const router = useRouter();
  const search = useSearchParams();
  const groupId = Number(search.get("groupId"));
  const groupName = search.get("groupName");
  const groupSlot = search.get("groupSlot");

  const [selectedStudentId, setSelectedStudentId] = useState<null | number>(
    null
  );

  const { students, statistics, getStudentStatistics } = useGroup({
    date: "",
    groupId,
  });

  if (!groupId) return <p>Veuillez spécifier un groupe et une date</p>;

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

      {groupName && groupSlot && (
        <div>
          <h1 className="text-xl font-bold text-center mt-6">
            {formatCourseName(groupName)}
          </h1>
          <p className="text-md font-semibold text-center">{formatDayToThreeLetters(groupSlot)}</p>
        </div>
      )}

      <GroupRecap groupRecap={statistics} />

      <div className="flex items-center ml-6 mt-2">
        <Image src={user} alt="nombre d'étudiants" width={17} height={17} />
        <h1 className="text-[14px] font-semibold ml-2">
          Nombre d&apos;étudiants: {students.length}
        </h1>
      </div>

      <div className="flex flex-col gap-2 p-5 min-h-[33%] max-h-[60%] grow overflow-y-auto">
        {students.map(({ name, id }: any) => (
          <StudentItem
            onClick={() => setSelectedStudentId(id)}
            key={id}
            name={name}
            totalAbsences={getStudentStatistics(id).totalAbsences}
          />
        ))}
      </div>

      <Modal
        withCloseButton={false}
        radius="lg"
        onClose={() => setSelectedStudentId(null)}
        opened={selectedStudentId !== null}
        centered
      >
        {selectedStudentId ? (
          <StudentModalContentWrapper
            studentStats={getStudentStatistics(selectedStudentId)}
            onClickCancel={() => setSelectedStudentId(null)}
            group_id={groupId}
            student_id={selectedStudentId}
          />
        ) : null}
      </Modal>
    </div>
  );
};

export default StudentsPage;
