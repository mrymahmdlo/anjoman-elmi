const stageTexts = ["اطلاعات آزمون", "اضافه کردن زیردرس های آزمون"];

export const HeaderTextLoader = (stage, stages) => {
  switch (stage) {
    case stages.QUIZINFO:
      return stageTexts[0];
    case stages.QUIZDETAILS:
      return stageTexts[1];
    default:
      return "";
  }
};
