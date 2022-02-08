import { GeorgianToHejri } from "src/Utility/DateTime";
export const ConvertDates = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (key === "doneDateTime" && obj[key] === null) return;
      if (key === "startDateTime" || key === "doneDateTime") {
        obj[key] = obj[key] ? GeorgianToHejri(obj[key]) : "ندارد";
      }
    })
  );
  return arr;
};
