import { GeorgianToHejri } from "src/Utility/DateTime";

export const ChangeValuesManageWebinar = (arr) => {
    arr.forEach((obj) =>
      Object.keys(obj).forEach(function (key) {
        if (key === "startDateTime" || key === "endDateTime") {
          obj[key] = obj[key] ? GeorgianToHejri(obj[key]) : "ندارد";
        }
        if (obj[key] === null || obj[key] === " ") {
          obj[key] = "ثبت نشده";
        }
      })
    );
  return arr;
};
