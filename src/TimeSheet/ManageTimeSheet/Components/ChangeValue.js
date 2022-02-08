export const ChangeValuesTimeSheet = (arr)=> {
  const days=['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه'];
  arr.forEach((obj) => {
    obj["weekDay"] = days[obj["weekDay"]];
  });
  return arr;
};
