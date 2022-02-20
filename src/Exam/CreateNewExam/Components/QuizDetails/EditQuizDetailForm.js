import React, { useEffect, useState } from "react";
import ExamService from "../../../ExamService/ExamService";
import { TextField } from "src/Utility/InputGroup";
import { ExamContext } from "../../CreateNewExam";
import { ToastContext } from "src/containers/TheContent";
import { QuizDetailsFormItems } from "./QuizDetailsFormItems";
import { InitialForm } from "./QuizDetailsValidators";
import { CheckValidationArry } from "src/reusable/CheckValidationArry";
import { QuizDetailsValidators } from "./QuizDetailsValidators";

import { CCardBody, CRow, CButton, CSpinner } from "@coreui/react";

const EditQuizDetailForm = ({ item, setUpdated }) => {
  const exam = React.useContext(ExamContext);
  const toast = React.useContext(ToastContext);
  const [courseIds, setCourceIds] = useState([]);
  const [btnActice, setBtnActive] = useState(false);
  const preRowId = item.rowId;
  const [form, setForm] = useState(item);
  const items = QuizDetailsFormItems(form, setForm, courseIds).map((item) =>
    TextField(item)
  );
  const afterCheck = (text) => {
    toast.showToast(text);
    setBtnActive(false);
  };
  useEffect(() => {
    ExamService.GetDropDowns().then((res) =>
      setCourceIds(res.data.course.options)
    );
    setForm(item);
  }, [item]);
  const handleSubmit = () => {
    setBtnActive(true);
    if (!CheckValidationArry(form, QuizDetailsValidators)) {
      return afterCheck("لطفا فیلد های قرمز شده را پر یا اصلاح کنید");
    }
    ExamService.UpdateQuizInfoDetail(preRowId, form)
      .then((res) => {
        if (res.success) {
          toast.showToast("سوال با موفقیت اصلاح شد ");
          setForm(InitialForm(exam.quizId, item.rowId + 1));
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
    <CCardBody>
      <CRow>{items.slice(0, 2)}</CRow>
      <CRow>{items.slice(2, 4)}</CRow>
      <CRow>{items.slice(4, 6)}</CRow>
      {!btnActice ? (
        <CButton type="submit" size="sm" color="primary" onClick={handleSubmit}>
          ویرایش زیرآزمون
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

export default EditQuizDetailForm;
