import React, { useEffect, useState } from "react";
import ExamService from "../../../ExamService/ExamService";
import { TextField } from "src/Utility/InputGroup";
import { ExamContext } from "../../CreateNewExam";
import { QuizDetailsFormItems } from "./QuizDetailsFormItems";
import { InitialForm } from "./QuizDetailsValidators";
import { CheckValidationArry } from "src/reusable/CheckValidationArry";
import { QuizDetailsValidators } from "./QuizDetailsValidators";
// todo
// change it to import
const { CCardBody, CRow, CButton, CSpinner } = require("@coreui/react");

const AddNewCourseForm = ({ data, setUpdated }) => {
  const exam = React.useContext(ExamContext);
  const [courseIds, setCourceIds] = useState([]);
  const [btnActice, setBtnActive] = useState(false);
  const [form, setForm] = useState(InitialForm(exam.quizId, data?.rowId));
  const items = QuizDetailsFormItems(form, setForm, courseIds).map((item) =>
    TextField(item)
  );
  const afterCheck = (text) => {
    exam.setErrorContent(text);
    exam.setShowError(true);
    setBtnActive(false);
  };
  useEffect(() => {
    ExamService.GetDropDowns().then((res) =>
      setCourceIds(res.data.course.options)
    );
  }, []);
  const handleSubmit = () => {
    exam.setShowError(false);
    setBtnActive(true);
    if (!CheckValidationArry(form, QuizDetailsValidators)) {
      return afterCheck("لطفا فیلد های قرمز شده را پر یا اصلاح کنید");
    }
    ExamService.CreateQuizDetails(form)
      .then((res) => {
        if (res.success) {
          exam.setErrorContent("داده با موفقیت ثبت شد ");
          setForm(InitialForm(exam.quizId, data?.rowId + 1));
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
    <CCardBody>
      <CRow>{items.slice(0, 2)}</CRow>
      <CRow>{items.slice(2, 4)}</CRow>
      <CRow>{items.slice(4, 6)}</CRow>
      {!btnActice ? (
        <CButton type="submit" size="sm" color="primary" onClick={handleSubmit}>
          ثبت زیرآزمون
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

export default AddNewCourseForm;
