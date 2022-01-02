export const ChangeValues = (arr)=> {
  const days=['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شبه', 'جمعه', 'شنبه'];
  arr.forEach((obj) => {
    obj["weekDay"] = days[obj["weekDay"]];
  });
  return arr;
};
