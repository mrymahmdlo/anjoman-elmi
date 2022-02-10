import { GeorgianToHejri } from "src/Utility/DateTime";

export const ChangeValuesManageWebinar = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (key === "startDate" || key === "endDate" ) {
        obj[key] = obj[key] ? GeorgianToHejri(obj[key]) : "ندارد";
      }

    })
  );
  return arr;
};
