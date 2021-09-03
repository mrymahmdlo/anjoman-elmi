import moment from "jalali-moment";

const DateTimeFormat = "YYYY/MM/DD HH:mm";
const DotNetDateTimeFormat = "YYYY-MM-DDTHH:mm";

export const GeorgianToHejri = (date) =>
  moment(date, DateTimeFormat).locale("fa").format(DateTimeFormat);
export const DotNetGeorgianToHejri = (date) => {
  try {
    return moment(date, DotNetDateTimeFormat)
      .locale("fa")
      .format(DateTimeFormat);
  } catch {
    return moment().locale("fa").format(DateTimeFormat);
  }
};
export const HejriToDotNetGeorgian = (date) => {
  try {
    return moment
      .from(date, "fa", DateTimeFormat)
      .locale("en")
      .format(DotNetDateTimeFormat);
  } catch {
    return null;
  }
};

export const GetDotNetGeorgianFromDateJS = (date) =>
  HejriToDotNetGeorgian(GeorgianToHejri(date));
