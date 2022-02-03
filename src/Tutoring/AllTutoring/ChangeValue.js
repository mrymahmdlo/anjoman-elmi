import JDate from "jalali-date";
import { DateFormatter } from "src/Utility/DateFormatter";

export const ChangeValuesAllTutoring = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (
        key === "purchasedDate" ||
        key === "startDateRange" ||
        key === "sessionStartDate"
      ) {
        let date = new Date(obj[key]);
        let jdate = new JDate(date);
        if (obj[key] !== null) {
          obj[key] = DateFormatter(jdate, date);
        } else {
          obj[key] = "-";
        }
      }
      if (key === "status") {
          obj[key] = obj[key] === 0 ?  "خریداری شده" : obj[key] = obj[key] === 1 ?  "رزرو شده" : obj[key] = obj[key] === 2 ? "پشتیبان وارد شده است ": obj[key] = obj[key] === 3 ? "برگزار شده   ": obj[key] = obj[key] === 4 ? "دانش آموز وارد شده است" : null;

      }
      if (key === "sponserName") {
        obj[key] = obj[key] === null ? "انتخاب نشده" : obj[key];
      }
    })
  );
  return arr;
};
