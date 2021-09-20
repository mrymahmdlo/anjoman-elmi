import React, { useState } from "react";
import {
  CButton,
  CCardBody,
  CCardFooter,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { EditableQuestionList } from "../Components/CreateQuestions/EditableQuestionList";

const QuizDetailsForm = () => {
  const [btnActice, setBtnActive] = useState(false);

  const handleSubmit = () => {
    setBtnActive(true);
  };
  return (
    <>
      <CCardBody>
        <CRow className="mt-2">
          <EditableQuestionList />
        </CRow>
      </CCardBody>
      <CCardFooter>
        {!btnActice ? (
          <CButton
            type="submit"
            size="sm"
            color="success"
            onClick={handleSubmit}
          >
            <CIcon name="cil-x-circle" /> اتمام ایجاد آزمون
          </CButton>
        ) : (
          <CSpinner
            style={{ width: "2rem", height: "2rem" }}
            color="primary"
            variant="grow"
          />
        )}
      </CCardFooter>
    </>
  );
};

export default QuizDetailsForm;
