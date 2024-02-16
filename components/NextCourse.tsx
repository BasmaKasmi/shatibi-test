"use client";

import Image from "next/image";
import done from "@/public/done.svg";
import { useRouter } from "next/navigation";
import { formatCourseName } from "@/lib/format-utils";

type Course = {
  id: string;
  start_time: string;
  end_time: string;
  classroom: string;
  session: number;
  total: number;
  name: string;
  date: string;
  validate: boolean;
  slot: string;
};

type NextCourseProps = {
  course: Course;
};


const NextCourse = ({ course }: NextCourseProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        // @ts-ignore
        router.push(
          `emargement?groupId=${course.id}&date=${course.date}&groupName=${course.name}&groupSlot=${course.slot}`
          )
        }
    >
      <div className="bg-white rounded-xl p-2 shadow-md flex justify-between items-center py-2 px-2 relative mt-2">
        <div className="absolute left-12 h-14 w-1 bg-shatibi-orange rounded-lg-lg"></div>
        <div>
          <p className="text-black text-xs font-normal">{course.start_time}</p>
          <p className="text-black text-xs font-normal pt-2">
            {course.end_time}
          </p>
        </div>
        <div>
          <p className="text-[13px] font-semibold inline-block pl-2">{formatCourseName(course.name)}</p>
          <p className="text-[13px] font-semibold italic text-shatibi-orange pl-2">
            {course.classroom}
          </p>
        </div>
        <div className="text-xs font-semibold italic mt-10 text-shatibi-grey mr-4">
          {course.session}
        </div>
        {course.validate && (
          <div className="absolute top-5 right-4">
            <Image src={done} alt="Emargement validé" />
          </div>
          )}
      </div>
    </div>
  );
};

export default NextCourse;