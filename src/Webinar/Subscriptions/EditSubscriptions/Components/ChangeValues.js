export const ChangeValuesEditSubscriptions = (obj) => {
  let newobj = {
    webinarLink: obj.webinarLink,

    buyDateTime: obj.buyDateTime === "ندارد" ? null : obj.buyDateTime,
    joinDateTime: obj.joinDateTime === "ندارد" ? null : obj.joinDateTime,
    cancelDateTime: obj.cancelDateTime === "ندارد" ? null : obj.cancelDateTime,
  };

  return newobj;
};
