"use client";

import React from "react";
import { Calendar } from "@mantine/dates";
import "@mantine/dates/styles.css";
import Image from "next/image";
import { formatWeekday, isSameDay } from "@/lib/dates";

interface DayHighlight {
  date: Date;
  groupId: number;
  id: number;
  validate: boolean;
}

interface CalendarComponentProps {
  daysToHighlight: DayHighlight[];
  selectedGroupIds: number[]; 
}

type ColorCache = {
  [groupId: string]: string;
};

const groupColorCache: ColorCache = {};

export function computeColorHexFromString(groupId: number): string {

  const key = groupId.toString();

  if (groupColorCache[key]) {
    return groupColorCache[key];
  }

  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = Math.floor(
    Math.abs((Math.sin(hash) * 16777215) % 1) * 16777215
  ).toString(16);
  const colorHex = `#${"0".repeat(6 - color.length)}${color}`;
  groupColorCache[key] = colorHex;

  return colorHex;
}

const CalendarComponent = 
({
  daysToHighlight,
  selectedGroupIds,
}: CalendarComponentProps) => {

  const renderDay = (date: Date) => {
    const highlightedDay = daysToHighlight.find((d) =>
      isSameDay(d.date, date) && (selectedGroupIds.length === 0 || selectedGroupIds.includes(d.groupId))
    );

    if (highlightedDay) {
      return (
        <div
          style={{
            backgroundColor: computeColorHexFromString(
              highlightedDay.groupId            
              ),
          }}
          className="rounded-full font-extrabold -pl-2 shadow-2xl text-white p-4 w-2 h-2 flex items-center justify-center text-center align-middle"
        >
          <p className="w-fit">{highlightedDay.date.getDate()}</p>
        </div>
      );
    }

    return null;
  };

  return (
  <div className="px-6 py-8 flex items-center justify-center w-full">
      <Calendar
        styles={{
          calendarHeader: {
            paddingInline: "1rem",
            marginLeft:"auto",
            marginRight: "auto",
          },
          weekday: {
            color: "#5F5F5F",
            fontWeight: "bolder",
            fontSize: "1.1rem",
          },
          day: {
            color: "black",
            fontWeight: "normal",
            fontSize: "1.1rem",
            margin: "0.25rem",
          },
          calendarHeaderLevel: {
            fontWeight: "700",
            fontSize: "1.2rem",
          },
        }}
        nextIcon={
          <Image
            src="/assets/calendarHeaderControl1.svg"
            alt="next"
            width={32}
            height={32}
            className="rotate-180"
          />
        }
        previousIcon={
          <Image
            src="/assets/calendarHeaderControl1.svg"
            alt="previous"
            width={32}
            height={32}
          />
        }
        firstDayOfWeek={1}
        weekdayFormat={formatWeekday}
        renderDay={renderDay}
      />
      </div>
  );
};

export default CalendarComponent;