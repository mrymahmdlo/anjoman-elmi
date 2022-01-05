import { DotNetGeorgianToHejri } from "src/Utility/DateTime";

export const ChangeValue = (arr) => {
  arr.forEach((obj) => {
    obj["purchasedDate"] = DotNetGeorgianToHejri(obj["purchasedDate"])
    obj["startDateRange"] = DotNetGeorgianToHejri(obj["startDateRange"])
  });
  return arr;
};
