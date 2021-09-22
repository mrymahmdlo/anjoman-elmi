import React from "react";
import { CCardBody, CLabel, CRow } from "@coreui/react";
import { EditableQuestionList } from "../Components/CreateQuestions/EditableQuestionList";
import ExamCardFooter from "../Components/ExamCardFooter";

const QuizDetailsForm = () => {
  return (
    <>
      <CCardBody>
        <CRow className="mt-2">
          <CLabel className="m-2">
            اگر حالت "سوال به سوال" و یا "هردو" را برای برگزاری آزمون انتخاب
            کرده اید، سوالات آزمون را با زدن بر روی "افزودن سوال" وارد کنید.
          </CLabel>
          <EditableQuestionList />
        </CRow>
      </CCardBody>
      <ExamCardFooter />
    </>
  );
};

export default QuizDetailsForm;
