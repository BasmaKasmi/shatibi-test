"use client";

import Button from "@/components/Button";
import { useState } from "react";
import Image from "next/image";
import statusup from '@/public/statusup.svg';
import { StudentDetails } from "@/components/StudentDetails";

export const StudentItem = ({ totalAbsences, name, onClick }: any) => {
  console.log(`${name} a un total de ${totalAbsences} absence(s).`);
  return(
    <div
    onClick={onClick}
    className="flex flex-row shadow-md rounded-lg justify-between p-3"
  >
    <div className="ml-5">
      <p className="text-[14px] font-semibold">{name}</p>
      <p className="text-xs font-light">Absences: {totalAbsences}</p>
    </div>
  </div>
  );

};


export const StudentStatistics = ({
  name,
  totalAbsences, 
  ap,
  presencePercentage,
  onClickCancel,
  onClickDeclarerAp,
}: any) => {
  return(
    <div className="relative p-2 grid justify-items-center">
    <h2 className="text-xl font-bold text-center">{name}</h2>
    <div className="flex mt-4 justify-start w-full">
      <Image
        src={statusup}
        alt="Recapitulatif du groupe"
        width={17}
        height={17}
      />
      <h1 className="text-[14px] font-semibold ml-2">Récapitulatif du groupe:</h1>
    </div>
    <div className="flex justify-center items-center bg-white shadow-md rounded-lg w-full mx-auto mt-2 py-2">
      <div className="flex justify-around space-x-14 items-center">
        {[
          {
            name: "Absence",
            number: totalAbsences,
            isPercentage: false,
          },
          {
            name: "Présence",
            number: presencePercentage,
            isPercentage: true,
          },
          {
            name: "AP",
            number: ap,
            isPercentage: false,
          },
        ].map(({ name, number, isPercentage }) => (
          <div
            key={name}
            className="flex flex-col items-center justify-center"
          >
            <span className="text-black font-semibold text-lg">
              {number}{isPercentage ? " %" : ""}
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
        className="text-shatibi-red bg-shatibi-light-red font-semibold py-2 px-4 rounded-full"
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
  onClickCancel,
}: any) => {
  const [modalToDisplay, setModalToDisplay] = useState<"statistics" | "declare_ap">("statistics");

  const { name, totalAbsences, ap, presencePercentage } = studentStats;

  if (modalToDisplay === "statistics") {
    return (
      <StudentStatistics
      name={name}
      totalAbsences={totalAbsences}
      ap={ap}
      presencePercentage={presencePercentage}
      onClickDeclarerAp={() => setModalToDisplay("declare_ap")}
      onClickCancel={onClickCancel}
    />
    
    );
  }

  return <p>
    <StudentDetails 
     name={name}
    />
  </p>;
};
