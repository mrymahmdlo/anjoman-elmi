export const ChangeValuesEditAllTutoring = (obj) => {
  let newobj = {
    providerId: +obj.providerId,
    tutorialId: +obj.tutorialId,
    startDateRange: obj.startDateRange,
  };
  return newobj;
};
