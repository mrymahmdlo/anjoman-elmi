import { GeorgianToHejri } from "src/Utility/DateTime";

export const ChangeValuesManageSubscriptions = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (
        key === "buyDateTime" ||
        key === "joinDateTime" ||
        key === "cancelDatetime"
      ) {
        obj[key] = obj[key]!==null ? GeorgianToHejri(obj[key]) : "ندارد";
      }
      if (key === "webinar") {
        obj["webinarName"] = obj.webinar.title;
      }
      if (key === "webinarLink") {
        obj["webinarLink"] = obj.webinarLink === "" ? "ندارد" : obj.webinarLink;
      }
    })
  );
  return arr;
};
