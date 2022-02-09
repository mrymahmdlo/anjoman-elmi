import { ExamContext } from "../CreateNewExam/CreateNewExam";
import React, { useState } from "react";
import ExamService from "src/Exam/ExamService/ExamService";
import { useHistory } from "react-router";
// todo
// change it to import
const { default: CIcon } = require("@coreui/icons-react");
const { CCardFooter, CButton, CSpinner } = require("@coreui/react");

const EditExamCardFooter = () => {
  const [btnActice, setBtnActive] = useState(false);
  const exam = React.useContext(ExamContext);
  const history = useHistory();
  const handleSubmit = () => {
    setBtnActive(true);
    ExamService.FinalCheck(exam.quizId)
      .then((res) => {
        if (res.success) {
          history.push("/Exams/ManageExams");
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
      {exam.stage !== exam.stages.EDITQUIZINFO ? (
        <CButton
          className="m-2"
          type="submit"
          size="sm"
          color="dark"
          onClick={() => {
            exam.setStage(exam.stages.EDITQUIZINFO);
            history.push("/Exams/EditExam/EditQuizInfo/" + exam.quizId);
          }}
        >
          <CIcon name="cil-italic" /> ویرایش اطلاعات آزمون
        </CButton>
      ) : null}
      {exam.stage !== exam.stages.QUIZDETAILS ? (
        <CButton
          className="m-2"
          type="submit"
          size="sm"
          color="dark"
          onClick={() => {
            exam.setStage(exam.stages.QUIZDETAILS);
            history.push("/Exams/EditExam/QuizDetails/" + exam.quizId);
          }}
        >
          <CIcon name="cil-notes" /> ویرایش اطلاعات زیرآزمون
        </CButton>
      ) : null}
      {exam.stage !== exam.stages.QUIZQUESTIONS ? (
        <CButton
          className="m-2"
          type="submit"
          size="sm"
          color="dark"
          onClick={() => {
            exam.setStage(exam.stages.QUIZQUESTIONS);
            history.push("/Exams/EditExam/Questions/" + exam.quizId);
          }}
        >
          <CIcon name="cil-list-numbered" /> ویرایش سوالات آزمون
        </CButton>
      ) : null}
      {!btnActice ? (
        <CButton
          type="submit"
          size="sm"
          className="m-2"
          color="success"
          onClick={handleSubmit}
        >
          <CIcon name="cil-check" /> اتمام ویرایش آزمون
        </CButton>
      ) : (
        <CSpinner
          style={{ width: "1.5rem", height: "1.5rem" }}
          color="success"
          variant="grow"
        />
      )}
    </CCardFooter>
  );
};

export default EditExamCardFooter;
