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
