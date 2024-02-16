import "dayjs/locale/fr";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { Group } from "@/app/emargement/groupsPage/page";

dayjs.extend(customParseFormat);
dayjs.locale("fr");

const capitalize = (s: string) =>
  s.length === 0 ? "" : s[0].toUpperCase() + s.slice(1);

export const displayDate = (dateAsString: string) =>
  dayjs(dateAsString, "YYYY-MM-DD").format("DD/MM/YYYY");

export const displayFullDate = (dateAsString: string) =>
  capitalize(dayjs(dateAsString, "YYYY-MM-DD").format("dddd DD MMM YYYY"));

export const displayToday = () =>
  capitalize(dayjs().format("dddd D MMMM YYYY"));

export const isSameDay = (dateA: Date, dateB: Date) =>
  dayjs(dateA).format("DD MMM YYYY") === dayjs(dateB).format("DD MMM YYYY");

export const formatWeekday = (date: Date) => {
  const weekday = dayjs(date).format("dddd");
  if (weekday === "mercredi") return "Me";
  return weekday.charAt(0).toUpperCase();
};

export const formatDayToThreeLetters = (slot: string): string => {
  const daysMap: { [key: string]: string } = {
    Lu: "Lun",
    Ma: "Mar",
    Me: "Mer",
    Je: "Jeu",
    Ve: "Ve",
    Sa: "Sam",
    Di: "Dim",
  };

  if (slot.toLowerCase().startsWith("vendredi")) {
    return slot.replace(/vendredi/i, "Ven");
  }

  const dayAbbreviation = slot.substring(0, 2);
  const dayInThreeLetters = daysMap[dayAbbreviation];
  const timeSlot = slot.substring(2);

  return `${dayInThreeLetters || "Err"}${timeSlot}`;
};

const daySortOrder: { [key: string]: number } = {
  Lun: 1, Mar: 2, Mer: 3, Jeu: 4, Ven: 5, Sam: 6, Dim: 7};

export function sortGroupsByDay(groups: Group[]): Group[] {
  return groups.sort((a, b) => {
    const dayA = formatDayToThreeLetters(a.slot);
    const dayB = formatDayToThreeLetters(b.slot);
    return (daySortOrder[dayA] || 0) - (daySortOrder[dayB] || 0);
  });
}
