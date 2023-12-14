import Image from "next/image";
import calendar from '@/public/calendar.svg';
import AP from '@/public/AP.svg';
import Button from "./Button";
import RechercheIcon from '@/public/recherche-icon.svg';
import { useQuery } from "@tanstack/react-query";
import BackendApi from "@/lib/backend-api";
import { useEffect, useState } from 'react';
import { displayDate } from "@/lib/dates";


const getDates = async (params: { group_id: string, student_id: string, start_date: string, end_date: string }) => {
  const payload = {
    group_id: params.group_id,
    student_id: params.student_id,
    start_date: params.start_date || "",
    end_date: params.end_date || ""
  };
  try {
    const response = await BackendApi.post("/teacher/attendance/group/student", payload);
    if (response.data.status === "fail") {
      throw new Error(response.data.error);
    }
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data.result;
  } catch (error) {
    throw error; 
  }
};

export const StudentDetails = ({ group_id, student_id, name }: { group_id: string; student_id: string; name: string }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const { data: dateRange, refetch: refetchDateRange, isError, error } = useQuery<string[], Error>({
    queryKey: ["dateRange", group_id, student_id, startDate, endDate],
    queryFn: () => getDates({ group_id, student_id, start_date: startDate, end_date: endDate }),
  });


  if (isError) {
    return <div>{error.message}</div>;
  }
  const renderDateList = () => {
    return dateRange?.map((date, index) => (
      <div key={index} className="p-2 bg-white shadow-md rounded-lg cursor-pointer">
        <p className="text-[14px] font-semibold">{displayDate(date)}</p>
      </div>
    ));
  };

  return (
  <div className="relative p-2 justify-items-center flex flex-col items-center overflow-hidden">
    <h2 className="text-center text-lg font-semibold text-black mb-8">{name}</h2>
      <div className="mb-4 bg-white rounded-xl shadow w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 h-24 mx-auto">
        <div className="flex gap-2 pl-4 place-items-center">
          <Image className="mt-2" src={calendar} alt="User" />

          <label
            htmlFor="searchStudentByName"
            className="block text-sm font-semibold mt-2"
          >
            Choisir dates :
          </label>
        </div>
        <div className="flex justify-center gap-4"> 
        <input
          id="start_date"
          placeholder="yyyy-mm-dd"
          className="w-1/3 p-2 pl-6 border rounded-full mt-2 text-xs"
          value={startDate || ''}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          id="end_date"
          placeholder="yyyy-mm-dd"
          className="w-1/3 p-2 pl-6 border rounded-full mt-2 text-xs"
          value={endDate || ''}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Image className="mt-2" src={RechercheIcon} alt="rechercher" />
        </div>
      </div>
      <div className="mb-4 bg-white rounded-xl shadow w-full h-64 sm:h-64 md:h-96 lg:h-80 xl:h-96">
        <div className="flex gap-2 pl-4 place-items-center text-sm font-semibold mt-3">
          <Image src={AP} alt="User" />
          Sélectionner les AP :
          </div>
       </div>
       {renderDateList()}
       <div className="flex justify-center gap-6 w-full mt-4">
        <Button
          className="text-shatibi-green bg-shatibi-light-green font-bold py-2 px-8 rounded-full"
          variant="green"
        >
          Valider
        </Button>
        <Button
          className="text-shatibi-red bg-shatibi-light-red font-bold py-2 px-8 rounded-full"
          variant="red"
          >
          Annuler
        </Button>
      </div>
    </div>
  );
};
