import { GetDotNetGeorgianFromDateJS } from "../../../../Utility/DateTime";

export const ChangeValues = (obj) => {
  let newobj = {
    providerId: obj.providerId,
    tutorialId: obj.tutorialId,
    startDateRange: obj.startDateRange,
  };
  return newobj;
};
