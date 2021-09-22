import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";

const stageTexts = [
  "اطلاعات آزمون",
  "ویرایش اطلاعات کارنامه",
  "ویرایش سوالات آزمون",
  "ویرایش اطلاعات آزمون",
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
      case stages.EDITQUIZINFO:
        return stageTexts[3];
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
