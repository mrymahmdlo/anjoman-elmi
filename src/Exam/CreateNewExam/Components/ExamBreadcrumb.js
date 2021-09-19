import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";

const stageTexts = [
  "اطلاعات آزمون",
  "اضافه کردن اطلاعات کارنامه و افزودن فایل های آزمون",
  "اضافه کردن سوالات آزمون",
];

export const ExamBreadcrumb = (stage, stages) => {
  const headers = () => {
    switch (stage) {
      case stages.QUIZINFO:
        return stageTexts[0];
      case stages.QUIZDETAILS:
        return stageTexts[1];
      case stages.QUIZQUESTIONS:
        return stageTexts[2];
      default:
        return "";
    }
  };
  return (
    <CBreadcrumb>
      <CBreadcrumbItem active>ساخت آزمون</CBreadcrumbItem>
      <CBreadcrumbItem active>{headers()} </CBreadcrumbItem>
    </CBreadcrumb>
  );
};
