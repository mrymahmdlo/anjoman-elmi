import { ExamContext } from "../CreateNewExam";
import React, { useState } from "react";
import ExamService from "src/Exam/ExamService/ExamService";
const { default: CIcon } = require("@coreui/icons-react");
const { CCardFooter, CButton, CSpinner } = require("@coreui/react");

const ExamCardFooter = () => {
  const [btnActice, setBtnActive] = useState(false);
  const exam = React.useContext(ExamContext);

  const handleSubmit = () => {
    setBtnActive(true);
    ExamService.FinalCheck(exam.quizId)
      .then((res) => {
        if (res.success) {
          exam.setErrorContent(res.message);
          //redirecting to table of exams
        } else exam.setErrorContent(res.message);
      })
      .catch((err) => {
        exam.setErrorContent(err.message);
      })
      .finally(() => {
        exam.setShowError(true);
        setBtnActive(false);
      });
  };

  return (
    <CCardFooter>
      <CButton
        className="m-2"
        type="submit"
        size="sm"
        color="success"
        onClick={() => {
          exam.setStage(exam.stages.EDITQUIZINFO);
        }}
      >
        <CIcon name="cil-italic" /> ویرایش اطلاعات آزمون
      </CButton>
      <CButton
        className="m-2"
        type="submit"
        size="sm"
        color="info"
        onClick={() => {
          exam.setStage(exam.stages.QUIZDETAILS);
        }}
      >
        <CIcon name="cil-notes" /> ویرایش اطلاعات کارنامه
      </CButton>
      <CButton
        className="m-2"
        type="submit"
        size="sm"
        color="info"
        onClick={() => {
          exam.setStage(exam.stages.QUIZQUESTIONS);
        }}
      >
        <CIcon name="cil-list-numbered" /> ویرایش سوالات آزمون
      </CButton>
      {!btnActice ? (
        <CButton
          type="submit"
          size="sm"
          className="m-2"
          color="danger"
          onClick={handleSubmit}
        >
          <CIcon name="cil-x-circle" /> اتمام ایجاد آزمون
        </CButton>
      ) : (
        <CSpinner
          style={{ width: "1.5rem", height: "1.5rem" }}
          color="primary"
          variant="grow"
        />
      )}
    </CCardFooter>
  );
};

export default ExamCardFooter;
