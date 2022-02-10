import { GeorgianToHejri } from "src/Utility/DateTime";

export const ChangeValueSms = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (key === "time" || key === "endDate" || key === "resultDate") {
        obj[key] = obj[key] ? GeorgianToHejri(obj[key]) : "ندارد";
      }

    })
  );
  return arr;
};
