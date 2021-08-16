export const DateFormatter = (jdate, date) => {
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
  return string;
};
