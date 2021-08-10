import JDate from "jalali-date";

export const ChangeValues = (arr) => {
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
        let date = new Date(obj[key]);
        let jdate = new JDate(date);
        let string =
          ("0" + date.getHours()).substr(-2) +
          ":" +
          ("0" + date.getMinutes()).substr(-2) +
          "  " +
          jdate.getFullYear() +
          "/" +
          jdate.getMonth() +
          "/" +
          jdate.getDate();
        obj[key] = string;
      }
      if (obj[key] === null) {
        obj[key] = "ثبت نشده";
      }
    })
  );
  return arr;
};
