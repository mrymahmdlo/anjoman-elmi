import React, { useState } from "react";
import {
  CButton,
  CCardBody,
  CCardFooter,
  CCol,
  CLabel,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { EditableQuizDetailsLists } from "../Components/QuizDetails/EditableQuizDetailsLists";
import AddFilesButtons from "../Components/QuizDetails/AddFilesButtons";
import { ExamContext } from "../CreateNewExam";

const QuizDetailsForm = ({ quizId }) => {
  const [btnActice, setBtnActive] = useState(false);
  const exam = React.useContext(ExamContext);

  const handleSubmit = () => {
    exam.setShowError(false);
    exam.setBtnActive(true);
    setBtnActive(true);
  };

  return (
    <>
      <CCardBody>
        <CRow>
          <CCol className="col-sm-10">
            <CLabel>
              برای آپلود فایل سوالات، فایل پاسخ نامه و یا ویدیو مربوط به آزمون ،
              فایل را در محل مناسب آپلود کنید.
            </CLabel>
          </CCol>
        </CRow>
        <CRow>
          <AddFilesButtons />
        </CRow>
        <CRow className="mt-2">
          <EditableQuizDetailsLists quizId={quizId} />
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
