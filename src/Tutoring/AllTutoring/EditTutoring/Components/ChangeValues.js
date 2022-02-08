export const ChangeValuesEditAllTutoring = (obj) => {
  let newobj = {
    providerId: +obj.providerId,
    tutorialId: +obj.tutorialId,
    startDateRange: `${obj.startDateRange.slice(7,16)} ${obj.startDateRange.slice(0,5)}`,
  };
  return newobj;
};
