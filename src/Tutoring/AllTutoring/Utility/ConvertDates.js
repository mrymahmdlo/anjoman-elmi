import { GeorgianToHejri } from "src/Utility/DateTime";
export const ConvertDates = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (key === "sessionStartDate" && obj[key] === null) return;
      if (
        key === "purchasedDate" ||
        key === "startDateRange" ||
        key === "sessionStartDate"
      ) {
        obj[key] = obj[key] ? GeorgianToHejri(obj[key]) : "ندارد";
      }
    })
  );
  return arr;
};
