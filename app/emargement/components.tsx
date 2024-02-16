"use client";

import Button from "@/components/Button";
import { useState } from "react";
import Image from "next/image";
import statusup from "@/public/statusup.svg";
import ConfirmAp from "@/components/ConfirmAp";
import { useList } from "react-use";
import { StudentDates } from "@/components/StudentDates";

export const StudentStatistics = ({
  name,
  ai,
  ap,
  studentPercentage,
  onClickCancel,
  onClickDeclarerAp,
}: any) => {
  return (
    <div className="relative p-2 grid justify-items-center">
      <h2 className="text-xl font-bold text-center">{name}</h2>
      <div className="flex mt-4 justify-start w-full">
        <Image
          src={statusup}
          alt="Recapitulatif du groupe"
          width={17}
          height={17}
        />
        <h1 className="text-[14px] font-semibold ml-2">
          Récapitulatif du groupe :
        </h1>
      </div>
      <div className="flex justify-center items-center bg-white shadow-md rounded-lg w-full mx-auto mt-2 py-2">
        <div className="flex justify-around space-x-11 items-center">
          {[
            {
              name: "Abs. prévues",
              number: ap,
              isPercentage: false,
            },
            {
              name: "Abs. injustifiées",
              number: ai,
              isPercentage: false,
            },
            {
              name: "Présence",
              number: studentPercentage,
              isPercentage: true,
            },
          ].map(({ name, number, isPercentage }) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center"
            >
              <span className="text-black font-semibold text-lg">
                {number}
                {isPercentage ? " %" : ""}
              </span>
              <div className="text-black font-light text-xs">{name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <Button
          className="text-shatibi-orange bg-shatibi-light-green font-semibold py-2 px-4 rounded-full"
          onClick={onClickDeclarerAp}
          variant="orange"
        >
          Déclare AP
        </Button>
        <Button
          className="bg-shatibi-red/[.15] text-shatibi-red font-semibold py-2 px-4 rounded-full"
          onClick={onClickCancel}
          variant="red"
        >
          Annuler
        </Button>
      </div>
    </div>
  );
};

export const StudentModalContentWrapper = ({
  studentStats,
  student_id,
  group_id,
  onClickCancel,
}: any) => {
  const [modalToDisplay, setModalToDisplay] = useState<
    "StudentStatistics" | "StudentDates" | "ConfirmAp"
  >("StudentStatistics");

  const handleGoToConfirmAp = () => {
    if (selectedDates.length === 0) {
      alert("Veuillez sélectionner au moins une date avant de continuer.");
    } else {
      setModalToDisplay("ConfirmAp");
    }
  };

  const handleBackToStudentDetails = () => {
    setModalToDisplay("StudentDates");
  };

  const handleClickCancelStudentDates = () => {
    setModalToDisplay("StudentStatistics");
  };

  const [selectedDates, selectedDatesFunctions] = useList<string>([]);

  return (
    <>
      {modalToDisplay === "StudentStatistics" && (
        <StudentStatistics
          name={studentStats.name}
          ai={studentStats.ai}
          ap={studentStats.ap}
          totalSessions={studentStats.totalSessions}
          studentPercentage={studentStats.presencePercentage}
          onClickDeclarerAp={() => setModalToDisplay("StudentDates")}
          onClickCancel={onClickCancel}
        />
      )}

      {modalToDisplay === "StudentDates" && (
        <StudentDates
          name={studentStats.name}
          student_id={student_id}
          group_id={group_id}
          onClickCancel={handleClickCancelStudentDates}
          onClickValidate={handleGoToConfirmAp}
          selectedDates={selectedDates}
          selectedDatesFunctions={selectedDatesFunctions}
        />
      )}

      {modalToDisplay === "ConfirmAp" && (
        <ConfirmAp
          student={studentStats.student}
          onClickCancel={handleBackToStudentDetails}
          onClickValidate={() => {}}
          selectedDates={selectedDates}
        />
      )}
    </>
  );
};
