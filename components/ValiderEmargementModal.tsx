import Image from "next/image";
import validate from "@/public/validation.svg";
import Button from "./Button";
import { useRouter } from "next/navigation";



type Student = {
  id: number;
  name: string;
  absent: boolean;
  motive: string | null;
};

interface ValiderEmargementModalProps {
  onValidate: () => void;
  onCancel: () => void;
  students: Student[]; 
}
const ValiderEmargementModal = ({ onValidate, onCancel, students }: ValiderEmargementModalProps)=> {
  const router = useRouter();

  const presentCount = students.filter(student => !student.absent).length;
  const absentCount = students.filter(student => student.absent).length;


  const handleValidate = () => {
    onValidate();
    router.push("/");
  }

  return (
  <div className="relative p-2 grid justify-items-center">
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center">
          <Image src={validate} alt="validation icon" width={50} height={50} />
        </div> 
      </div>         
        <h3 className="text-center text-lg font-semibold text-black my-2">Vous déclarez avoir :</h3>
        <div className="text-center">
        <p>{presentCount} Présents</p>
        <p>{absentCount} Absents</p>
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
          className="text-shatibi-red bg-shatibi-light-red font-bold py-2 px-8 rounded-full"
          onClick={onCancel} 
          variant="red"
          >
          Annuler
        </Button>
      </div>
  </div>
  );
};

export default ValiderEmargementModal;