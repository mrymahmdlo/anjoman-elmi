import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";

const stageTexts = [
  "اطلاعات آزمون",
  "اضافه کردن اطلاعات کارنامه و بارگزاری فایل های آزمون",
  "اضافه کردن سوالات ",
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
    <CBreadcrumb className="mb-0">
      <CBreadcrumbItem active>ساخت آزمون</CBreadcrumbItem>
      <CBreadcrumbItem active>{headers()} </CBreadcrumbItem>
    </CBreadcrumb>
  );
};
