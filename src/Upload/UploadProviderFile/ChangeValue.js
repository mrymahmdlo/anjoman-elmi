import { GeorgianToHejri } from "src/Utility/DateTime";

export const ChangeValueUpload = (arr) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
           if (key === "contentType") {
             obj[key] =
               obj[key] === 0
                 ? "تدریس خصوصی"
                 : obj[key] === 1
                 ? "نمونه برنامه"
                 : "لینک صفحه شخصی";
           }
      if (key === "dateSubmitted") {
        obj[key] = obj[key] ? GeorgianToHejri(obj[key]) : "ندارد";
      }

    })
  );
  return arr;
};
