import CIcon from "@coreui/icons-react";
import React, { useEffect, useState } from "react";
import ExamService from "../../../ExamService/ExamService";
import {
  UploadQuestionFile,
  UploadAnswerFile,
  UploadAnswerVideo,
} from "../../../ExamService/ExamUploadFile";
import { ExamContext } from "../../CreateNewExam";
// todo
import {
  CCardBody,
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CFormText,
  CInput,
  CSpinner,
  CButton,
} from "@coreui/react";

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
  const [statusvideoFile, setStatusvideoFile] = useState(2);
  const [videoAddress, setVideoAddress] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    ExamService.GetQuizFilesNames(exam.quizId).then((res) => {
      setData(res.data);
      setStatusQuestionFile(
        res.data.questionFileName ? status.UPLOADED : status.EMPTY
      );
      setStatusAnswerFile(
        res.data.answerFileName ? status.UPLOADED : status.EMPTY
      );
      setStatusvideoFile(
        res.data.answerVideoFileName ? status.UPLOADED : status.EMPTY
      );
      setVideoAddress(
        res.data.answerVideoFileName ? res.data.answerVideoFileName : ""
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
        <CCol sm={4}>
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
              {data?.questionFileName
                ? data.questionFileName + "آپلود شده است"
                : " فایل تمام سوالات آزمون را یک جا به صورت pdf آپلود کنید"}
            </CFormText>
          </CFormGroup>
        </CCol>
        <CCol sm={4}>
          <CFormGroup>
            <CRow>
              <CLabel htmlFor="nf-title">بارگزاری فایل پاسخ نامه آزمون</CLabel>
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
              {data?.answerFileName
                ? data.answerFileName + "آپلود شده است"
                : "   فایل کامل پاسخ نامه این آزمون را اینجا آپلود کنید"}
            </CFormText>
          </CFormGroup>
        </CCol>
        <CCol sm={4}>
          <CFormGroup>
            <CRow>
              <CLabel htmlFor="nf-title">بارگزاری ویدیو حل سوالات آزمون</CLabel>
            </CRow>
            <CRow>
              <CCol sm={1}>{switchMark(statusvideoFile)}</CCol>
              <CCol sm={8}>
                <CInput
                  id="file-answer-video"
                  type="text"
                  className="p-1 mr-1"
                  value={videoAddress}
                  onChange={(e) => setVideoAddress(e.target.value)}
                  placeholder="آدرس دانلود ویدیو"
                />
              </CCol>
              <CCol sm={2}>
                <CButton
                  color="primary"
                  onClick={() =>
                    UploadAnswerVideo(
                      videoAddress,
                      exam.quizId,
                      setStatusvideoFile
                    )
                  }
                >
                  ثبت
                </CButton>
              </CCol>
            </CRow>
            <CRow>
              <CFormText className="help-block">
                فایل ویدیویی حل سوال را در سایت های آنلاین آپلود کرده و لینک
                دانلود آن را در باکس کپی کنید.
              </CFormText>
            </CRow>
          </CFormGroup>
        </CCol>
      </CRow>
    </CCardBody>
  );
};

export default AddFilesButtons;
