import { useState } from "react";
import { useHistory } from "react-router";
import { ToastContext } from "src/containers/TheContent";
import ImportQuestion from "../Service/ImportQuestion";
import * as React from "react";

const {
  CCol,
  CFormGroup,
  CLabel,
  CFormText,
  CInput,
  CContainer,
  CRow,
  CButton,
} = require("@coreui/react");

export const AddQuestionFromBank = ({ quizId, item }) => {
  const [questionNoImportFrom, setQuestionNoImportFrom] = useState(null);
  const toast = React.useContext(ToastContext);
  const history = useHistory();
  const submitQuesion = () => {
    ImportQuestion.AddQuestion({
      QuizIdImportFrom: +item.quizId,
      QuestionNoImportFrom: +item.questionNo,
      QuizIdImportTo: +quizId,
      QuestionNoImportTo: +questionNoImportFrom,
    })
      .then((res) => {
        if (res.data > 0) {
          toast.showToast("با موفقیت ثبت شد");
          history.push("/Exams/EditExam/Questions/" + quizId);
        } else {
          toast.showToast(res.message);
        }
      })
      .catch(() => toast.showToast("خطا در ثبت سوال"))
  };

  return (
    <CContainer>
      <CRow>
        <CCol sm={8}>
          <CFormGroup>
            <CLabel htmlFor="nf-title">شماره سوال</CLabel>
            <CInput
              valid={questionNoImportFrom > 0}
              invalid={questionNoImportFrom < 1}
              type="number"
              placeholder={"شماره "}
              onChange={(e) => {
                setQuestionNoImportFrom(+e.target.value);
              }}
            />
            <CFormText className="help-block">
              شماره سوالی که در آزمون خود میخواهید با این سوال جایگزین شود را
              وارد کنید.
            </CFormText>
          </CFormGroup>
        </CCol>
        <CCol style={{ display: "flex", alignItems: "center" }}>
          <CButton
            color="primary"
            disabled={+questionNoImportFrom < 1}
            onClick={submitQuesion}
          >
            ثبت سوال
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CFormGroup className="m-1 p-2">
          <CLabel htmlFor="nf-title">اطلاعات سوال</CLabel>
          <CFormText>
            {" "}
            <p
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: item.questionText }}
            ></p>
          </CFormText>
          <CFormText>
            1-{" "}
            <p
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: item.choice1 }}
            ></p>
          </CFormText>
          <CFormText>
            2-{" "}
            <p
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: item.choice2 }}
            ></p>
          </CFormText>
          <CFormText>
            3-{" "}
            <p
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: item.choice3 }}
            ></p>
          </CFormText>
          <CFormText>
            4-{" "}
            <p
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: item.choice4 }}
            ></p>
          </CFormText>
          <CFormText className="p-1">پاسخ صحیح:</CFormText>
          <CFormText>گزینه {item.correctAnswerNo}</CFormText>
        </CFormGroup>
      </CRow>
    </CContainer>
  );
};
