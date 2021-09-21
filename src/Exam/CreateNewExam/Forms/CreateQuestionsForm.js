import React from "react";
import { CCardBody, CRow } from "@coreui/react";
import { EditableQuestionList } from "../Components/CreateQuestions/EditableQuestionList";
import ExamCardFooter from "../Components/ExamCardFooter";

const QuizDetailsForm = () => {
  return (
    <>
      <CCardBody>
        <CRow className="mt-2">
          <EditableQuestionList />
        </CRow>
      </CCardBody>
      <ExamCardFooter />
    </>
  );
};

export default QuizDetailsForm;
