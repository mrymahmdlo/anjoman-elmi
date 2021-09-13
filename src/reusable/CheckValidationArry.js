export const CheckValidationArry = (obj, validators) => {
  let isValid = true;
  Object.keys(validators).forEach(function (key) {
    if (validators[key].mustFill) {
      if (obj[key] === "" || obj[key] === undefined || obj[key] === null) {
        isValid = false;
      }
    }
  });
  return isValid;
};
