import JDate from "jalali-date";
import { DateFormatter } from "src/Utility/DateFormatter";

export const ChangeValues = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (
        key === "buyDateTime" ||
        key === "joinDatetime" ||
        key === "cancelDatetime"
      ) {
        let date = new Date(obj[key]);
        let jdate = new JDate(date);
        obj[key] = DateFormatter(jdate, date);
      }
    })
  );
  return arr;
};
