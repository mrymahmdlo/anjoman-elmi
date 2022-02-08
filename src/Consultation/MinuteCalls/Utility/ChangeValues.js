import { GeorgianToHejri } from "src/Utility/DateTime";

export const ChangeValuesMinuteCalls = (arr) => {
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
        obj[key] = obj[key] ? GeorgianToHejri(obj[key]) : "ندارد";
      }
      if (obj[key] === null) {
        obj[key] = "ثبت نشده";
      }
    })
  );
  return arr;
};
