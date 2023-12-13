import "dayjs/locale/fr";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);
dayjs.locale("fr");

const capitalize = (s: string) =>
  s.length === 0 ? "" : s[0].toUpperCase() + s.slice(1);

  export const displayDate = (dateAsString: string) =>
  dayjs(dateAsString, "YYYY-MM-DD").format("DD/MM/YYYY");


export const displayToday = () =>
  capitalize(dayjs().format("dddd D MMMM YYYY"));
