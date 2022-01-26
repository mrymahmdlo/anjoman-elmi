export const ChangeValues = (obj) => {
  let newobj = {
    tutorialId: +obj.tutorialId,
    sponserId: +obj.sponserId,
  };
  return newobj;
};
