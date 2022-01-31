export const ChangeValues = (obj) => {
  let newobj = {
    webinarLink: obj.webinarLink,

    buyDateTime: obj.buyDateTime,
    joinDatetime: obj.joinDatetime,
    cancelDatetime: obj.cancelDatetime,
  };

  return newobj;
};
