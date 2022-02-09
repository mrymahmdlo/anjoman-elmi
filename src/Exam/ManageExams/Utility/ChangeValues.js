import { GeorgianToHejri } from "src/Utility/DateTime";

export const ChangeValuesManageExams = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (key === "startDate" || key === "endDate" || key === "resultDate") {
        obj[key] = obj[key] ? GeorgianToHejri(obj[key]) : "ندارد";
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
      if (key === "studentCount") {
        obj[key] = obj[key] === 0 ? "نامحدود" : obj[key];
      }
      if (obj[key] === null || obj[key] === "") {
        obj[key] = "ثبت نشده!";
      }
    })
  );
  return arr;
};
