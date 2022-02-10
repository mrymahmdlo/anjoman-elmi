import { ExamContext } from "../CreateNewExam";
import { ToastContext } from "src/containers/TheContent";
import React, { useState } from "react";
import ExamService from "../../ExamService/ExamService";
import { useHistory } from "react-router";
import { ExamModalContainer } from "./ExamModalContainer";
// todo
// change it to import
const { default: CIcon } = require("@coreui/icons-react");
const { CCardFooter, CButton, CSpinner } = require("@coreui/react");

const ExamCardFooter = () => {
  const [btnActice, setBtnActive] = useState(false);
  const [btnDelete, setBtnDelete] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const exam = React.useContext(ExamContext);
  const toast = React.useContext(ToastContext);
  const history = useHistory();
  const handleSubmit = () => {
    setBtnActive(true);
    ExamService.FinalCheck(exam.quizId)
      .then((res) => {
        if (res.success) {
          history.push("/Exams/ManageExams");
        } else toast.showToast(res.message);
      })
      .catch((err) => {
        toast.showToast(err.message);
      })
      .finally(() => {
        setBtnActive(false);
      });
  };

  const handleDelete = () => {
    setBtnDelete(true);
    ExamService.DeleteQuiz(exam.quizId)
      .then((res) => {
        if (res.success) {
          history.push("/Exams/ManageExams");
        } else toast.showToast(res.message);
      })
      .catch((err) => {
        toast.showToast(err.message);
      })
      .finally(() => {
        setBtnDelete(false);
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
            history.push("/Exams/CreateExam/EditQuizInfo");
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
            history.push("/Exams/CreateExam/QuizDetails");
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
            history.push("/Exams/CreateExam/Questions");
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
          <CIcon name="cil-check" /> اتمام ایجاد آزمون
        </CButton>
      ) : (
        <CSpinner
          style={{ width: "1.5rem", height: "1.5rem" }}
          color="success"
          variant="grow"
        />
      )}
      {!btnDelete ? (
        <CButton
          type="submit"
          size="sm"
          className="m-2"
          color="danger"
          onClick={() => {
            setModalContent(
              <div>
                <p>
                  آیا میخواهید آزمون را حذف کنید؟
                  <CButton
                    color="danger"
                    size="sm"
                    className="mr-2"
                    onClick={handleDelete}
                  >
                    بله
                  </CButton>
                </p>
              </div>
            );
            setModal(!modal);
          }}
        >
          <CIcon name="cil-x-circle" /> حذف آزمون
        </CButton>
      ) : (
        <CSpinner
          style={{ width: "1.5rem", height: "1.5rem" }}
          color="danger"
          variant="grow"
        />
      )}
      <ExamModalContainer
        name="حذف آزمون"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      />
    </CCardFooter>
  );
};

export default ExamCardFooter;
