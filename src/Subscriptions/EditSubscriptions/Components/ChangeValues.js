export const ChangeValues = (obj) => {
  let newobj = {
    webinarLink: obj.webinarLink,

    buyDateTime: obj.buyDateTime == "ندارد" ? null : obj.buyDateTime,
    joinDatetime: obj.joinDatetime == "ندارد" ? null : obj.joinDatetime,
    cancelDatetime: obj.cancelDatetime == "ندارد" ? null : obj.cancelDatetime,
  };

  return newobj;
};
