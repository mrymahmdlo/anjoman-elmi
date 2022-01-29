export const ChangeValues = (obj) => {
  let newobj = {
    tutoringId: +obj.tutoringId,
    sponserId: +obj.sponserId,
  };
  return newobj;
};
