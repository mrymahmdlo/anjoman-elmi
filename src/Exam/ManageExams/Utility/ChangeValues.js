import JDate from "jalali-date";
import { DateFormatter } from "src/Utility/DateFormatter";

export const ChangeValues = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (key === "startDate" || key === "endDate" || key === "resultDate") {
        let date = new Date(obj[key]);
        let jdate = new JDate(date);
        obj[key] = DateFormatter(jdate, date);
      }
      if (key === "questionFileReady" || key === "answerFileReady") {
        obj[key] = obj[key] === true ? "بله" : "خیر";
      }
      if (key === "price") {
        obj[key] = obj[key] === 0 ? " رایگان " : obj[key] + " ریال ";
      }
      if (key === "totalTimeMinutes") {
        obj[key] += " دقیقه ";
      }
      if (obj[key] === null || obj[key] === "") {
        obj[key] = "ثبت نشده!";
      }
    })
  );
  return arr;
};
