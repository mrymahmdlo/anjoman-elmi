import React, { useState, useEffect } from "react";
import { TextField } from "src/Utility/InputGroup";
import { ExamContext } from "../../CreateNewExam";
import { ToastContext } from "src/containers/TheContent";
import { QuestionFormItems } from "./QuestionFormItems";
import ExamService from "../../../ExamService/ExamService";
import {
  InitialForm,
  levels,
  QuestionFormValidators,
} from "./QuestionFormValidators";
import { CheckValidationArry } from "src/reusable/CheckValidationArry";
import { CKEditorField } from "src/reusable/CKEditorInput";
import { CCardBody, CRow, CButton, CSpinner } from "@coreui/react";



const AddQuestionForm = ({ numQ, setUpdated }) => {
  const exam = React.useContext(ExamContext);
  const toast = React.useContext(ToastContext);
  const [btnActice, setBtnActive] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(InitialForm(exam.quizId, numQ));
  }, [exam.quizId, numQ]);

  const afterCheck = (text) => {
    toast.showToast(text);
    setBtnActive(false);
  };

  const items = QuestionFormItems(form, setForm, levels).map((item) =>
    TextField(item)
  );
  const handleSubmit = () => {
    setBtnActive(true);
    if (!CheckValidationArry(form, QuestionFormValidators)) {
      return afterCheck("لطفا فیلد های  ضروری را پر کنید");
    }
    ExamService.CreateQuestions(form)
      .then((res) => {
        if (res.success) {
          toast.showToast("داده با موفقیت ثبت شد ");
          setForm({});
          setUpdated(true);
        } else toast.showToast(res.message);
      })
      .catch((err) => {
        toast.showToast(err.message);
      })
      .finally(() => {
        setBtnActive(false);
      });
  };

  return (
    <CCardBody style={{ paddingTop: "0px" }}>
      <CRow>{items.slice(0, 2)}</CRow>
      <CRow>{items.slice(2, 4)}</CRow>
      <CRow>
        <CKEditorField
          name="متن سوال"
          text=""
          fieldName="questionText"
          form={form}
          setForm={setForm}
        />
      </CRow>
      <CRow>
        <CKEditorField
          name="*گزینه 1"
          text=""
          fieldName="choice1"
          form={form}
          setForm={setForm}
        />
      </CRow>
      <CRow>
        <CKEditorField
          name="*گزینه 2"
          text=""
          fieldName="choice2"
          form={form}
          setForm={setForm}
        />
      </CRow>
      <CRow>
        <CKEditorField
          name="*گزینه 3"
          text=""
          fieldName="choice3"
          form={form}
          setForm={setForm}
        />
      </CRow>
      <CRow>
        <CKEditorField
          name="*گزینه 4"
          text=""
          fieldName="choice4"
          form={form}
          setForm={setForm}
        />
      </CRow>
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

export default AddQuestionForm;
