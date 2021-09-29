import CIcon from "@coreui/icons-react";
import React, { useEffect, useState } from "react";
import ExamService from "src/Exam/ExamService/ExamService";
import { UploadExcel } from "src/Exam/ExamService/ExamUploadFile";
import { ExamContext } from "../../CreateNewExam";

const {
  CCardBody,
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CFormText,
  CInput,
  CSpinner,
  CButton,
} = require("@coreui/react");

const status = {
  LOADING: 0,
  UPLOADED: 1,
  FAILED: -1,
  EMPTY: 2,
};

const AddAnswerFile = () => {
  const exam = React.useContext(ExamContext);
  const [statusAnswerFile, setStatusAnswerFile] = useState(2);
  const [data, setData] = useState({});

  useEffect(() => {
    ExamService.GetQuizFilesNames(exam.quizId).then((res) => {
      setData(res.data);
      setStatusAnswerFile(
        res.data.sampleExcel ? status.UPLOADED : status.EMPTY
      );
    });
  }, [exam.quizId]);

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
    <CCardBody className="m-2 w-100">
      <CRow>
        <CCol sm={6}>
          <CFormGroup>
            <CRow>
              <CLabel htmlFor="nf-title">
                دریافت قالب اکسل پاسخنامه آزمون
              </CLabel>
            </CRow>
            <CRow>
              <a href="http://myexam.bamis.ir/AdminPanel/DownloadSampleExcel">
                <CButton color="primary">دریافت فایل</CButton>
              </a>
            </CRow>
            <CFormText className="help-block">
              برای افزودن پاسخنامه سوالات برای محاسبه کارنامه دانش آموز، لطفا
              فایل را دانلود کرده و با فرمت خواسته شده پر کنید.
            </CFormText>
          </CFormGroup>
        </CCol>
        <CCol sm={6}>
          <CFormGroup>
            <CRow>
              <CLabel htmlFor="nf-title">
                بارگزاری فایل اکسل پاسخنامه آزمون
              </CLabel>
            </CRow>
            <CRow>
              {switchMark(statusAnswerFile)}
              <CInput
                id="file-answers"
                type="file"
                className="p-1 mr-2 w-75 "
                onChange={(e) => {
                  UploadExcel(
                    e.target.files[0],
                    "xlsx",
                    exam.quizId,
                    setStatusAnswerFile
                  );
                }}
                accept=".xlsx"
                disabled={statusAnswerFile !== status.LOADING}
              />
            </CRow>
            <CFormText className="help-block">
              {data?.sampleExcel
                ? data.sampleExcel + "آپلود شده است"
                : "  فایل اکسل پر شده را در این قسمت بارگزاری کنید."}
            </CFormText>
          </CFormGroup>
        </CCol>
      </CRow>
    </CCardBody>
  );
};

export default AddAnswerFile;
