import JDate from "jalali-date";
import { DateFormatter } from "src/Utility/DateFormatter";

export const ChangeValue = (arr) => {
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
        let date = new Date(obj[key]);
        let jdate = new JDate(date);
        obj[key] = DateFormatter(jdate, date);
      }

    })
  );
  return arr;
};
