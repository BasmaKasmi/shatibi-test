import Image from "next/image";
import User from "@/public/ModalUser.svg";
import { useQuery } from "@tanstack/react-query";
import BackendApi from "@/lib/backend-api";
import { useState } from "react";
import RechercheIcon from '@/public/recherche-icon.svg';
import { useRouter } from "next/navigation";

interface Group {
  id: number;
  name: string;
  slot: string;
  session: string;
}

const searchStudentByName = async (studentName: string) => {
  const response = await BackendApi.post("teacher/find/student/information", {
    student_name: studentName,
  });

  if (response.data.status === "fail") {
    throw new Error(response.data.error);
  }

  return response.data.result;
};

const getGroups = async () => {
  const response = await BackendApi.get("teacher/group/list/year");
  if (response.data.status !== "success") {
    throw new Error(response.data.error);
  }
  return response.data.result;
};

const DeclareAp = () => {
  const [studentName, setStudentName] = useState("");

  const router = useRouter();

  const handleNameChange = (event: any) => {
    setStudentName(event.target.value);
  };

  const {
    data: groups,
    isLoading,
    isError,
    error,
  } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  const { data: studentsSearchResult, isError: isStudentSearchError } =
    useQuery<any[]>({
      queryKey: ["students", studentName],
      queryFn: () => searchStudentByName(studentName),
      enabled: studentName.length > 0,
    });

  console.log({ studentsSearchResult });

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur: {error.message}</div>;

  return (
  <div className="relative p-2 justify-items-center flex flex-col items-center overflow-hidden">
    <h3 className="text-center text-lg font-semibold text-black mb-8">
        Déclarer une AP
      </h3>

      <div className="mb-4 bg-white rounded-xl shadow w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 h-24 mx-auto">
        <div className="flex gap-2 pl-4 place-items-center">
          <Image className="mt-2" src={User} alt="User" />

          <label
            htmlFor="searchStudentByName"
            className="block text-sm font-semibold mt-2"
          >
            Rechercher par nom :
          </label>
        </div>
        <div className="flex justify-center"> 
        <input
        type="text"
        id="searchByName"
        className="w-9/12 p-2 pl-6 border rounded-full mt-2 text-xs"
        placeholder="Saisir nom de l’étudiant"
        value={studentName}
        onChange={handleNameChange}
        />
        <Image className="mt-2" src={RechercheIcon} alt="rechercher" />
        </div>
      </div>
      <div className="mb-4 bg-white rounded-xl shadow w-full h-64 sm:h-64 md:h-96 lg:h-80 xl:h-96">
        <div className="flex gap-2 pl-4 place-items-center text-sm font-semibold mt-3">
          <Image src={User} alt="User" />
          Rechercher par groupe :
          </div>
          <div className="flex flex-col items-center justify-center mt-2 max-h-[63%] overflow-y-scroll">
            {groups?.map((group) => (
            <div
            onClick={() =>
              // @ts-ignore
              router.push(`liste-etudiants?groupId=${group.id}&groupName=${group.name}&groupSlot=${group.slot}`)
            }
            key={group.id}
            className="p-2 bg-white shadow-md rounded-lg w-[90%] mt-2 mb-2"
            >
              <p className="text-[14px] font-semibold">{group.name}</p>
              <p className="text-xs font-light">{group.slot}</p>
            </div>
            ))}
            {!groups || (groups.length === 0 && <div>Pas de groupes à afficher</div>)}
          </div>
       </div>
    </div>
  );
};

export default DeclareAp;
