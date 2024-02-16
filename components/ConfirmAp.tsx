"use client";

import Image from "next/image";
import validate from "@/public/validation.svg";
import Button from "./Button";
import { displayDate } from "@/lib/dates";
import { useRouter } from "next/navigation";

type Student = {
  id: number;
  name: string;
  absent: boolean;
  motive: string | null;
};

interface ValiderEmargementModalProps {
  onClickValidate: () => void;
  onClickCancel: () => void;
  student: Student;
  selectedDates: string[];
}

const ConfirmAp = ({
  onClickValidate,
  onClickCancel,
  selectedDates,
}: ValiderEmargementModalProps) => {
  const router = useRouter();

  const redirectToDashboard = () => {
    router.push('/');
  };
  
  const handleValidate = () => {
    onClickValidate();
    redirectToDashboard();
  };

  return (
    <div className="relative p-2 grid justify-items-center">
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center">
          <Image src={validate} alt="validation icon" width={50} height={50} />
        </div>
      </div>
      <h3 className="text-center text-lg font-semibold text-black my-2">
        Absence(s) prévue(s) le :
      </h3>
      <div className="text-center space-y-2">
        {selectedDates.map((date, index) => (
        <p key={index} className="text-[14px] font-normal">
          {displayDate(date)}
        </p>
        ))}
      </div>

      <div className="flex justify-center gap-6 w-full mt-4">
        <Button
          className="text-shatibi-green bg-shatibi-light-green font-bold py-2 px-8 rounded-full"
          onClick={handleValidate}
          variant="green"
        >
          Valider
        </Button>
        <Button
          className="bg-shatibi-red/[.15] text-shatibi-red font-bold py-2 px-8 rounded-full"
          onClick={onClickCancel}
          variant="red"
        >
          Annuler
        </Button>
      </div>
    </div>
  );
};

export default ConfirmAp;
