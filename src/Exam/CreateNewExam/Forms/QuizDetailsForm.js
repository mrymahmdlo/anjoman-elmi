import React, { useState } from "react";
import {
  CButton,
  CCardBody,
  CCardFooter,
  CCol,
  CCollapse,
  CLabel,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import AddNewCourseForm from "../Components/QuizDetails/AddNewCourseForm";
import { EditableQuestionList } from "../Components/QuizDetails/EditableQuestionList";
import { EditableQuizDetailsLists } from "../Components/QuizDetails/EditableQuizDetailsLists";
import AddFilesButtons from "../Components/QuizDetails/AddFilesButtons";

const QuizDetailsForm = ({ setShowError, setErrorContent, quizId }) => {
  const [btnActice, setBtnActive] = useState(false);
  const [collapseDetail, setCollapseDetail] = useState(false);
  const [collapseFile, setCollapseFile] = useState(false);

  const handleSubmit = () => {
    setShowError(false);
    setBtnActive(true);
  };

  return (
    <>
      <CCardBody>
        <CRow>
          <CCol className="col-sm-10">
            <CLabel>
              برای آپلود فایل سوالات، فایل پاسخ نامه و یا ویدیو مربوط به آزمون ،
              بر دکمه مقابل کلیک کرده و فایل را در محل مناسب آپلود کنید.
            </CLabel>
          </CCol>
          <CCol>
            <CButton
              color="primary"
              onClick={(e) => {
                setCollapseFile(!collapseFile);
                e.preventDefault();
              }}
              className={"mb-1"}
            >
              افزودن فایل های آزمون
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <CCollapse show={collapseFile} className="w-100">
            <AddFilesButtons />
          </CCollapse>
        </CRow>
        <CRow className="mt-2">
          <CCol className="col-sm-10">
            <CLabel>
              برای افزودن زیردرس به آزمون، بر دکمه مقابل کلیک کرده و اطلاعات
              مربوط را پر کنید.
            </CLabel>
          </CCol>
          <CCol>
            <CButton
              color="primary"
              onClick={(e) => {
                setCollapseDetail(!collapseDetail);
                e.preventDefault();
              }}
              className={"mb-1"}
            >
              افزودن زیردرس
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <CCollapse show={collapseDetail} className="w-100">
            <AddNewCourseForm quizId={quizId} />
          </CCollapse>
        </CRow>
        <CRow className="mt-2">
          <EditableQuestionList />
        </CRow>
        <CRow className="mt-2">
          <EditableQuizDetailsLists />
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
