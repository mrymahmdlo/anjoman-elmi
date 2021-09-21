import React from "react";
import { CCardBody, CCol, CLabel, CRow } from "@coreui/react";
import { EditableQuizDetailsLists } from "../Components/QuizDetails/EditableQuizDetailsLists";
import AddFilesButtons from "../Components/QuizDetails/AddFilesButtons";
import ExamCardFooter from "../Components/ExamCardFooter";

const QuizDetailsForm = () => {
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
          <EditableQuizDetailsLists />
        </CRow>
      </CCardBody>
      <ExamCardFooter />
    </>
  );
};

export default QuizDetailsForm;
