export const ChangeValues = (obj) => {
  let newobj = {
    // webinarLink: obj.webinarLink,
    schedules: [
      {
        buyDateTime: obj.webinarSchedules[0].buyDateTime,
        joinDatetime: obj.webinarSchedules[0].joinDatetime,
        cancelDatetime: obj.webinarSchedules[0].cancelDatetime,
      },
    ],
  };

  return newobj;
};
