export const ChangeValuesManageTutoring = (arr)=> {
  arr.forEach((obj) => {
    obj["isOffline"]===false ? obj["isOffline"]='آفلاین' : obj["isOffline"]='آنلاین';
  });
  return arr;
};
