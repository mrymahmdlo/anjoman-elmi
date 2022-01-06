import { DotNetGeorgianToHejri } from "src/Utility/DateTime";
import JDate from "jalali-date";
import { DateFormatter } from "src/Utility/DateFormatter";

export const ChangeValue = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (key === "purchasedDate" || key === "startDateRange") {
        let date = new Date(obj[key]);
        let jdate = new JDate(date);
        obj[key] = DateFormatter(jdate, date);
      }
  //     if (key === "isOnline") {
  //  obj[key] = obj[key] === true ? "آفلاین" : "آنلاین";
  //     }
      if (key === "status") {
          obj[key] = obj[key] === 0 ?  "خریداری شده" : obj[key] = obj[key] === 1 ?  "رزو شده" : obj[key] = obj[key] === 2 ? "در حال برگزاری ": obj[key] = obj[key] === 3 ? "برگزار شده   ":null;

      }
    })
  );
  return arr;
};
