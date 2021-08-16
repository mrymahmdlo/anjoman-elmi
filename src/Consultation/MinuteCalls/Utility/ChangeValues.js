import JDate from "jalali-date";
import { DateFormatter } from "./DateFormatter";

export const ChangeValues = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (key === "reserveDateTime" && obj[key] === null) {
        obj[key] = "تماس آنلاین";
      }
      if (
        (key === "reserveDateTime" || key === "createDateTime") &&
        obj[key] !== null &&
        obj[key] !== "تماس آنلاین"
      ) {
        let date = new Date(obj[key]);
        let jdate = new JDate(date);
        obj[key] = DateFormatter(jdate, date);
      }
      if (obj[key] === null) {
        obj[key] = "ثبت نشده";
      }
    })
  );
  return arr;
};
