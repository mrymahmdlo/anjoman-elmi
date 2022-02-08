export const ChangeValuesSetSponsor = (obj) => {
  let newobj = {
    tutoringId: +obj.tutoringId,
    sponserId: +obj.sponserId,
  };
  return newobj;
};
