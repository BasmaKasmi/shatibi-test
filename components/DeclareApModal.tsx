import Image from "next/image";
import User from "@/public/ModalUser.svg";
import { useQuery, useMutation } from "@tanstack/react-query";
import BackendApi from "@/lib/backend-api";
import { useState } from "react";
import Button from "@/components/Button";

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

const DeclareApModal = () => {
  const [studentName, setStudentName] = useState("");

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
    <div className="relative p-2 grid justify-items-center">
      <h3 className="text-center text-lg font-semibold text-black mb-6">
            Déclarer une AP
          </h3>
      <div className="mb-4 bg-white rounded-xl shadow w-80 h-24">
        <div className="flex items-center ml-6">
          <Image className="mt-2" src={User} alt="User" />
          <label
            htmlFor="searchStudentByName"
            className="block text-sm font-semibold ml-2 mt-2"
          >
            Rechercher par nom :
          </label>
        </div>
        <input
          type="text"
          id="searchByName"
          className="w-72 p-2 border rounded-full ml-4 mt-2"
          placeholder="Saisir nom de l’étudiant"
          value={studentName}
          onChange={handleNameChange}
        />
      </div>

      <div className="mb-4 bg-white rounded-xl shadow w-80 h-80">
        <div className="flex items-center ml-6">
          <Image className="mt-2" src={User} alt="User" />
          <label
            htmlFor="searchByName"
            className="block text-sm font-semibold ml-2 mt-2"
          >
            Rechercher par groupe :
          </label>
        </div>
        <input
          type="text"
          id="searchByGroupName"
          className="w-72 p-2 border rounded-full ml-4 mt-4"
          placeholder="Saisir nom du groupe"
        />
        <div className="flex flex-col max-h-[63%] overflow-y-scroll">
          {groups?.map((group) => (
            <div
              key={group.id}
              className="p-2 bg-white shadow-md rounded-md w-72 ml-4 mt-2 mb-2"
            >
              <p className="text-[14px] font-semibold">{group.name}</p>
              <p className="text-xs font-light">{group.slot}</p>
            </div>
          ))}
          {!groups ||
            (groups.length === 0 && <div>Pas de groupes à afficher</div>)}
        </div>
      </div>
    </div>
  );
};

export default DeclareApModal;
