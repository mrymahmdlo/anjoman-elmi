import React from "react";
import { CCardBody, CLabel, CRow } from "@coreui/react";
import { EditableQuestionList } from "../Components/CreateQuestions/EditableQuestionList";
import ExamCardFooter from "../Components/ExamCardFooter";
import AddAnswerFile from "../Components/CreateQuestions/AddAnswerFile";
import { ExamContext } from "../CreateNewExam";

const QuizDetailsForm = () => {
  const exam = React.useContext(ExamContext);
  return (
    <>
      <CCardBody>
        {exam.quizMode === 0 ? (
          <CRow className="mt-2">
            <CLabel className="m-2">
              اگر حالت "آزمون با فایل(pdf)" را برای برگزاری آزمون انتخاب کرده
              اید، پاسخ سوالات را میتوانید در فایل اکسل داده شده وارد و در محل
              مشخص شده بارگزاری کنید.
            </CLabel>
            <AddAnswerFile />
          </CRow>
        ) : null}
        <CRow className="mt-2">
          <CLabel className="m-2">
            سوالات آزمون را با زدن بر روی "افزودن سوال" وارد کنید.
          </CLabel>
          <EditableQuestionList />
        </CRow>
      </CCardBody>
      <ExamCardFooter />
    </>
  );
};

export default QuizDetailsForm;
