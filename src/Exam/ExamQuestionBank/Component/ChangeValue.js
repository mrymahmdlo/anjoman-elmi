export const ChangeValues = (arr, options) => {
  arr.forEach((obj) =>
    Object.keys(obj).forEach(function (key) {
      if (key === "questionLevel") {
        obj[key] =
          obj[key] === 0
            ? "آسان"
            : obj[key] === 1
            ? "متوسط"
            : obj[key] === 2
            ? "دشوار"
            : "خیلی دشوار";
      }
      if (key === "courseId") {
        obj[key] = options?.find((item) => item.id === obj.courseId).name;
      }
    })
  );
  return arr;
};
