import JDate from "jalali-date";
import { DateFormatter } from "./DateFormatter";
export const ConvertDates = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (key === "doneDateTime" && obj[key] === null) return;
      if (key === "startDateTime" || key === "doneDateTime") {
        let date = new Date(obj[key]);
        let jdate = new JDate(date);
        obj[key] = DateFormatter(jdate, date);
      }
    })
  );
  return arr;
};
