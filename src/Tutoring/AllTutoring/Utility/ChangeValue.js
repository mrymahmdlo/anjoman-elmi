import { GeorgianToHejri } from "src/Utility/DateTime";

export const ChangeValuesAllTutoring = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (
        key === "purchasedDate" ||
        key === "startDateRange" ||
        key === "sessionStartDate"
      ) {
        obj[key] = obj[key] ? GeorgianToHejri(obj[key]) : "ندارد";
      }
        if (obj[key] === null || obj[key] === " ") {
          obj[key] = "ثبت نشده";
        }
 
    })
  );
  return arr;
};
