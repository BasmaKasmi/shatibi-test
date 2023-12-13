import Image from "next/image";
import calendar from '@/public/calendar.svg';
import AP from '@/public/AP.svg';
import Button from "./Button";
import RechercheIcon from '@/public/recherche-icon.svg';
import { useQuery } from "@tanstack/react-query";
import BackendApi from "@/lib/backend-api";
import { useState } from 'react';
import { displayDate } from "@/lib/dates";



const getDates = async ({ groupId, studentId, startDate, endDate }:any) => {
    try {
      const payload = {
        groupId,
        studentId,
        startDate: startDate || null,
        endDate: endDate || null, 
      };
  
      const response = await BackendApi.post("/teacher/attendance/group/student", payload);
      console.log(response.data.result); 
      return response.data.result;
    } catch (error) {
      console.error("An error occurred while fetching the dates:", error);
    }
  };
  

export const StudentDetails = ({ groupId, studentId, name }: any) => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);


    const { data: dateRange, refetch: refetchDateRange } = useQuery<string[], Error>({
        queryKey: ["dateRange", groupId, studentId, startDate ?? 'all', endDate ?? 'all'],
        queryFn: () => getDates({ groupId, studentId, startDate, endDate }),
      });
      
    const filterAndLimitDates = (dates: string[], startDate: string | null, endDate: string | null) => {
        if (!startDate || !endDate) {
            return dates.slice(0, 5);
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        return dates.filter(date => new Date(date) >= start && new Date(date) <= end).slice(0, 5);
      };
        

    const handleSearchClick = () => {
        if (startDate && endDate) {
          refetchDateRange();
        } else {
          console.error("Both start and end dates must be selected.");
        }
    };

    const limitedDateRange = filterAndLimitDates(dateRange || [], startDate, endDate);
    console.log(limitedDateRange);


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
          type="date" 
          id="startDate"
          className="w-1/3 p-2 pl-6 border rounded-full mt-2 text-xs"
          value={startDate ?? ''}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          id="endDate"
          className="w-1/3 p-2 pl-6 border rounded-full mt-2 text-xs"
          value={endDate ?? ''}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Image onClick={handleSearchClick} className="mt-2" src={RechercheIcon} alt="rechercher" />
        </div>
      </div>
      <div className="mb-4 bg-white rounded-xl shadow w-full h-64 sm:h-64 md:h-96 lg:h-80 xl:h-96">
        <div className="flex gap-2 pl-4 place-items-center text-sm font-semibold mt-3">
          <Image src={AP} alt="User" />
          Sélectionner les AP :
          </div>
          {limitedDateRange.map((date: string, index: number) => (
            <div key={index} className="p-2 bg-white shadow-md rounded-lg cursor-pointer">
              <p className="text-[14px] font-semibold">{displayDate(date)}</p>
            </div>
          ))}
       </div>
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
