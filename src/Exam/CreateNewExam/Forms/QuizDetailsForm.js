import React from "react";
import { CCardBody, CLabel, CRow } from "@coreui/react";
import { EditableQuizDetailsLists } from "../Components/QuizDetails/EditableQuizDetailsLists";
import ExamCardFooter from "../Components/ExamCardFooter";

const QuizDetailsForm = () => {
  return (
    <>
      <CCardBody>
        <CRow>
          <CLabel className="m-3">
            زیرآزمون های این آزمون را با زدن بر روی دکمه "افزودن زیرآزمون" تعریف
            کنید.
          </CLabel>
          <EditableQuizDetailsLists />
        </CRow>
      </CCardBody>
      <ExamCardFooter />
    </>
  );
};

export default QuizDetailsForm;
