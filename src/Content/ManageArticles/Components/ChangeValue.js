export const ChangeValues = (arr) => {
  arr.forEach((obj) => {
    if (obj["writerProviderName"] === null) {
      obj["writerProviderName"] = "مدیریت";
    }
  });
  return arr;
};
