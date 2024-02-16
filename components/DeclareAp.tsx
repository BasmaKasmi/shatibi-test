import Image from "next/image";
import User from "@/public/ModalUser.svg";
import { useQuery } from "@tanstack/react-query";
import BackendApi from "@/lib/backend-api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatCourseName } from "@/lib/format-utils";
import { Modal } from "@mantine/core";
import StudentGroups from "./StudentGroups";
import { formatDayToThreeLetters, sortGroupsByDay } from "@/lib/dates";

interface Group {
  id: number;
  name: string;
  slot: string;
  session: string;
}
interface Student {
  student_id: number;
  firstname: string;
  lastname: string;
  group_id: number;
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
  const [isStudentGroupsModalOpen, setIsStudentGroupsModalOpen] =
    useState(false);
  const [selectedStudentForGroups, setSelectedStudentForGroups] =
    useState<Student | null>(null);
  useState<boolean>(false);
  const [modalToDisplay, setModalToDisplay] = useState<
    "students_groups" | "declare_ap" | null
  >(null);

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

  const {
    data: studentsSearchResult,
    isLoading: isStudentLoading,
    isError: isStudentSearchError,
  } = useQuery<any[]>({
    queryKey: ["students", studentName],
    queryFn: () => searchStudentByName(studentName),
  });

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur: {error.message}</div>;

  const showStudentSearchResults =
    studentName.length > 0 &&
    (isStudentLoading ||
      (studentsSearchResult && studentsSearchResult.length > 0));

  const handleStudentClick = (student: Student) => {
    setSelectedStudentForGroups({
      student_id: student.student_id,
      firstname: student.firstname,
      lastname: student.lastname,
      group_id: student.group_id,
    });
    setIsStudentGroupsModalOpen(true);

    setModalToDisplay(null);
  };
  const handleCancel = () => {
    setIsStudentGroupsModalOpen(false);
  };
  
  const sortedGroups = groups ? sortGroupsByDay(groups) : [];

  return (
    <div className="relative p-2 justify-items-center flex flex-col items-center">
      {isStudentGroupsModalOpen ? (
        <style>
          {/* This enables us to hide the Mantine modal which is behind on which we put the id="declare-ap" */}

          {`
            /* Mantine modal body id */

            #declare-ap-body {
              display: none;
            }
          `}
        </style>
      ) : null}

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
            className="w-10/12 p-2 pl-6 border rounded-full mt-2 text-xs"
            placeholder="Saisir nom de l’étudiant"
            value={studentName}
            onChange={handleNameChange}
          />
        </div>
      </div>

      {showStudentSearchResults ? (
        <div className="mb-4 bg-white rounded-xl shadow w-full h-64 lg:h-80 xl:h-96 max-h-[63%] overflow-y-scroll">
          <div className="flex flex-col items-center justify-center space-y-2">
            {studentsSearchResult && studentsSearchResult.length > 0 ? (
              <div className="w-full px-4 py-2">
                {studentsSearchResult.map((student) => (
                  <div
                    key={student.student_id}
                    className="bg-white px-4 py-2 rounded-lg shadow-md mt-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleStudentClick(student)}
                  >
                    <p className="font-semibold text-sm truncate">{`${student.firstname} ${student.lastname}`}</p>
                  </div>
                ))}
              </div>
            ) : (
              !isStudentLoading && (
                <div className="text-gray-500 py-2 text-center">
                  Aucun étudiant trouvé
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="mb-4 bg-white rounded-xl shadow w-full h-64 sm:h-64 md:h-96 lg:h-80 xl:h-96">
          <div className="flex gap-2 pl-4 place-items-center text-sm font-semibold mt-4">
            <Image src={User} alt="User" />
            Rechercher par groupe :
          </div>
          <div className="flex flex-col items-center justify-between gap-2 mt-4 min-h-[33%] max-h-[55%] grow overflow-y-auto">
            {sortedGroups?.map((group) => (
              <div
                onClick={() =>
                  // @ts-ignore
                  router.push(
                    `liste-etudiants?groupId=${group.id}&groupName=${group.name}&groupSlot=${group.slot}`
                  )
                }
                key={group.id}
                className="px-4 py-2 bg-white shadow-md rounded-lg w-[95%] mb-2"
              >
                <p className="text-[14px] font-semibold">
                  {formatCourseName(group.name)}
                </p>
                <p className="text-xs font-light">
                  {formatDayToThreeLetters(group.slot)}
                </p>
              </div>
            ))}
            {!groups ||
              (groups.length === 0 && <div>Pas de groupes à afficher</div>)}
          </div>
        </div>
      )}

      <Modal
        id="selected-student-groups"
        withCloseButton={false}
        radius="lg"
        centered
        opened={isStudentGroupsModalOpen}
        onClose={() => setIsStudentGroupsModalOpen(false)}
      >
        {selectedStudentForGroups && (
          <StudentGroups
            name={`${selectedStudentForGroups.firstname} ${selectedStudentForGroups.lastname}`}
            studentId={selectedStudentForGroups.student_id}
            onCancel={handleCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default DeclareAp;
