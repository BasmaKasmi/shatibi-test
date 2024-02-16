"use client";

import Image from "next/image";
import User from "@/public/ModalUser.svg";
import { useQuery } from "@tanstack/react-query";
import BackendApi from "@/lib/backend-api";
import { useState } from "react";
import { Modal } from "@mantine/core";
import { useList } from "react-use";
import { StudentDates } from "./StudentDates";
import ConfirmAp from "./ConfirmAp";
import Button from "./Button";
import { formatCourseName } from "@/lib/format-utils";
import { formatDayToThreeLetters } from "@/lib/dates";

interface Group {
  id: number;
  name: string;
  slot: string;
}

interface StudentGroupResponse {
  status: 'fail' | 'success';
  error?: string;
  result: {
    student_id: number;
    lastname: string;
    firstname: string;
    group_list: Group[]; 
  };
}

const getStudentGroups = async (studentId: number): Promise<StudentGroupResponse> => {
  const response = await BackendApi.post<StudentGroupResponse>("teacher/find/student/group/list", {
    student_id: studentId,
  });

  if (response.data.status === 'fail') {
    throw new Error(response.data.error || 'An error occurred while fetching groups.');
  }

  return response.data;
};

const StudentGroups = ({
    name,
    studentId,
    onCancel,
}:{
    name: string;
    studentId: number;
    onCancel: () => void;
}) => {

  const [showConfirmAp, setShowConfirmAp] = useState(false);
  const [showStudentDatesModal, setShowStudentDatesModal] = useState<boolean>(false);
  const [selectedStudentGroup, setSelectedStudentGroup] = useState<any | null>(null);

  const [modalToDisplay, setModalToDisplay] = 
  useState<"students_groups" | "declare_ap" | "confirm_ap" | null>(null);


  const [selectedDates, selectedDatesFunctions] = useList<string>([]);

  const { data: groups, isLoading, isError, error } = useQuery<StudentGroupResponse, Error, Group[]>({
    queryKey: ["studentGroups", studentId],
    queryFn: () => getStudentGroups(studentId),
    enabled: !!studentId,
    select: (response) => response.result.group_list,
  });
  



  if (isLoading) return <div>Chargement des groupes...</div>;
  if (isError) return <div>Erreur lors du chargement des groupes: {error.message}</div>;

  const handleStudentGroupClick = async (group: Group) => {
    console.log(group);
    
    if (group && studentId) {
      try {
        const studentGroupResponse = await getStudentGroups(studentId);
  
        if (studentGroupResponse.status === 'success' && studentGroupResponse.result) {
          setSelectedStudentGroup({
            group_id: group.id,
            student_id: studentId,
            firstname: studentGroupResponse.result.firstname,
            lastname: studentGroupResponse.result.lastname,
          });
          setModalToDisplay("declare_ap");
        } else {
          throw new Error('Failed to fetch student details');
        }
      } catch (error) {
      }
    } else {
      console.error("Missing group ID or student ID");
    }
  };
  

  const handleValidateDates = () => {
    setShowConfirmAp(true);
    setShowStudentDatesModal(false)
  };
  const handleBackToStudentDates = () => {
    setModalToDisplay("students_groups");
  };


const handleCloseModal = () => {
  setModalToDisplay(null);
};


const handleConfirmAp = () => {
  onCancel(); 
  setShowConfirmAp(false);
  setSelectedStudentGroup(null);
};

    return (
    <div className="relative p-2 justify-items-center flex flex-col items-center overflow-hidden">
        <h2 className="text-center text-lg font-semibold text-black mb-8">
          {name}
        </h2>
        <div className="mb-4 bg-white rounded-xl shadow w-full h-64 sm:h-64 md:h-96 lg:h-80 xl:h-96">
        <div className="flex gap-2 pl-4 place-items-center text-sm font-semibold mt-3">
        <Image src={User} alt="User" />
          Sélectionner les groupes :
        </div>
        <div className="flex flex-col items-center justify-center mt-2 min-h-[33%] max-h-[60%] overflow-y-auto">
        {groups?.map((group) => (
            <div 
            key={group.id} 
            className="px-4 py-2 bg-white shadow-md rounded-lg w-[95%] mb-2"
            onClick={() => handleStudentGroupClick(group)}

            >
              <p className="font-semibold">
              {formatCourseName(group.name)}
                </p>
              <p className="text-xs font-light">{formatDayToThreeLetters(group.slot)}</p>
            </div>
          ))}
        </div>
        </div>

        <div className="w-full flex justify-end mt-4">
          <Button
            className="text-shatibi-red bg-shatibi-light-red font-bold py-2 px-8 ml-auto rounded-full"
            onClick={onCancel}
            variant="red"
          >
            Annuler
          </Button>
        </div>

        <Modal
        centered
        opened={modalToDisplay === "declare_ap" && selectedStudentGroup}
        withCloseButton={false}
        radius="lg"
        onClose={() => {
          setModalToDisplay(null);
          setSelectedStudentGroup(null);
          setShowConfirmAp(false);
          handleCloseModal;
          }}
          >
        {!showConfirmAp && selectedStudentGroup && (
            <StudentDates
            group_id={selectedStudentGroup.group_id}
            student_id={selectedStudentGroup.student_id}
            name={`${selectedStudentGroup.firstname} ${selectedStudentGroup.lastname}`}
            onClickCancel={handleCloseModal}
            onClickValidate={handleValidateDates}
            selectedDates={selectedDates}
            selectedDatesFunctions={selectedDatesFunctions}
            />
            )}
            {showConfirmAp && (
            <ConfirmAp
            student={selectedStudentGroup}
            onClickCancel={handleBackToStudentDates}
            onClickValidate={handleConfirmAp}
            selectedDates={selectedDates}
            />
            )}
            </Modal>
          </div>
    );
  };
  
  export default StudentGroups;