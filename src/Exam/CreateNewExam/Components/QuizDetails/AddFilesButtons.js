import CIcon from "@coreui/icons-react";
import React, { useState } from "react";
import {
  UploadQuestionFile,
  UploadAnswerFile,
} from "src/Exam/ExamService/ExamUploadFile";
import { ExamContext } from "../../CreateNewExam";

const {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CFormText,
  CInput,
  CSpinner,
} = require("@coreui/react");

const status = {
  LOADING: 0,
  UPLOADED: 1,
  FAILED: -1,
  EMPTY: 2,
};

const AddFilesButtons = () => {
  const exam = React.useContext(ExamContext);
  const [statusQuestionFile, setStatusQuestionFile] = useState(2);
  const [statusAnswerFile, setStatusAnswerFile] = useState(2);
  const switchMark = (fileStatus) => {
    switch (fileStatus) {
      case status.LOADING:
        return (
          <CSpinner
            style={{ width: "2rem", height: "2rem" }}
            color="primary"
            variant="grow"
          />
        );
      case status.UPLOADED:
        return (
          <CIcon
            name="cil-check-circle"
            style={{ width: "2rem", height: "2rem" }}
          />
        );
      case status.FAILED:
        return (
          <CIcon
            name="cil-x-circle"
            style={{ width: "2rem", height: "2rem" }}
          />
        );
      case status.EMPTY:
        return (
          <CIcon name="cil-file" style={{ width: "1.7rem", height: "2rem" }} />
        );
      default:
        return "";
    }
  };
  return (
    <CCard className="m-2 w-100">
      <CCardBody>
        <CRow>
          <CCol sm={3}>
            <CFormGroup>
              <CRow>
                <CLabel htmlFor="nf-title">بارگزاری فایل سوالات آزمون</CLabel>
              </CRow>
              <CRow>
                {switchMark(statusQuestionFile)}
                <CInput
                  id="file-questions"
                  type="file"
                  className="p-1 mr-2 w-75"
                  onChange={(e) => {
                    UploadQuestionFile(
                      e.target.files[0],
                      "pdf",
                      exam.quizId,
                      setStatusQuestionFile
                    );
                  }}
                  accept=".pdf"
                  disabled={statusQuestionFile === status.LOADING}
                />
              </CRow>
              <CFormText className="help-block">
                فایل تمام سوالات آزمون را یک جا به صورت pdf آپلود کنید
              </CFormText>
            </CFormGroup>
          </CCol>
          <CCol sm={4}>
            <CFormGroup>
              <CRow>
                <CLabel htmlFor="nf-title">
                  بارگزاری فایل پاسخ نامه آزمون
                </CLabel>
              </CRow>
              <CRow>
                {switchMark(statusAnswerFile)}
                <CInput
                  id="file-answers"
                  type="file"
                  className="p-1 mr-2 w-75 "
                  onChange={(e) => {
                    UploadAnswerFile(
                      e.target.files[0],
                      "pdf",
                      exam.quizId,
                      setStatusAnswerFile
                    );
                  }}
                  accept=".pdf"
                  disabled={statusAnswerFile === status.LOADING}
                />
              </CRow>
              <CFormText className="help-block">
                فایل کامل پاسخ نامه این آزمون را اینجا آپلود کنید
              </CFormText>
            </CFormGroup>
          </CCol>
          <CCol sm={4}>
            <CFormGroup>
              <CRow>
                <CLabel htmlFor="nf-title">
                  بارگزاری ویدیو حل سوالات آزمون
                </CLabel>
              </CRow>
              <CInput
                id="file-answer-video"
                type="file"
                className="p-1"
                disabled
              />
              <CFormText className="help-block">
                در آینده اضافه خواهد شد
              </CFormText>
            </CFormGroup>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default AddFilesButtons;
