import React, { useState } from "react";
import { CKEditorField, TextField } from "src/Utility/InputGroup";
import { ExamContext } from "../../CreateNewExam";
import { QuestionFormItems } from "./QuestionFormItems";
import ExamService from "src/Exam/ExamService/ExamService";
import { levels, QuestionFormValidators } from "./QuestionFormValidators";
import { CheckValidationArry } from "src/reusable/CheckValidationArry";
const { CCardBody, CRow, CButton, CSpinner } = require("@coreui/react");

const EditQuestionForm = ({ item, setUpdated }) => {
  const exam = React.useContext(ExamContext);
  const [btnActice, setBtnActive] = useState(false);
  const [form, setForm] = useState(item);
  const [preNumQ] = useState(item.questionNo);
  const afterCheck = (text) => {
    exam.setErrorContent(text);
    exam.setShowError(true);
    setBtnActive(false);
  };

  const items = QuestionFormItems(item, setForm, levels).map((item) =>
    TextField(item)
  );

  const handleSubmit = () => {
    exam.setShowError(false);
    setBtnActive(true);
    if (!CheckValidationArry(form, QuestionFormValidators)) {
      return afterCheck("لطفا فیلد های  ضروری را پر کنید");
    }
    ExamService.UpdateQuestion(preNumQ, form)
      .then((res) => {
        if (res.success) {
          exam.setErrorContent("داده با موفقیت ثبت شد ");
          setForm({});
          setUpdated(true);
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
    <CCardBody style={{ paddingTop: "0px" }}>
      <CRow>{items.slice(0, 2)}</CRow>
      <CRow>{items.slice(2, 4)}</CRow>
      <CRow>
        {CKEditorField("متن سوال", "", setForm, form, "questionText")}
      </CRow>
      <CRow>{CKEditorField("*گزینه اول", "", setForm, form, "choice1")}</CRow>
      <CRow>{CKEditorField("*گزینه دوم", "", setForm, form, "choice2")}</CRow>
      <CRow>{CKEditorField("*گزینه سوم", "", setForm, form, "choice3")}</CRow>
      <CRow>{CKEditorField("*گزینه چهارم", "", setForm, form, "choice4")}</CRow>
      {!btnActice ? (
        <CButton type="submit" size="sm" color="primary" onClick={handleSubmit}>
          ثبت سوال
        </CButton>
      ) : (
        <CSpinner
          style={{ width: "2rem", height: "2rem" }}
          color="primary"
          variant="grow"
        />
      )}
    </CCardBody>
  );
};

export default EditQuestionForm;
