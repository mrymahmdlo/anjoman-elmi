import React, { useState } from "react";
import ExamService from "../../../ExamService/ExamService";
import { TextField } from "src/Utility/InputGroup";
import { ExamContext } from "../../CreateNewExam";
import { ToastContext } from "src/containers/TheContent";
import { FormNumberInput } from "src/reusable/FormInput";
import CIcon from "@coreui/icons-react";
// todo
import { CCardBody, CRow, CButton, CSpinner, CLabel } from "@coreui/react";

const SwitchQuestions = ({ numCourses, setUpdated }) => {
  const exam = React.useContext(ExamContext);
  const toast = React.useContext(ToastContext);
  const [btnActice, setBtnActive] = useState(false);
  const [form, setForm] = useState({ quizId: exam.quizId });

  const afterCheck = (text) => {
    toast.showToast(text);
    setBtnActive(false);
  };

  const handleSubmit = () => {
    setBtnActive(true);
    if (!form.firstId || !form.secondId) {
      return afterCheck("لطفا فیلد های قرمز شده را پر یا اصلاح کنید");
    }
    ExamService.SwapQuestions(form)
      .then((res) => {
        if (res.success) {
          toast.showToast("جا به جایی با موفقیت انجام شد");
          setForm({ quizId: exam.quizId });
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
      <CRow>
        <CLabel>
          برای جا به جایی دو سوال ثبت شده، شماره سطر آن را در فرم زیر وارد کنید.
        </CLabel>
      </CRow>
      <CRow>
        <CLabel>
          {" "}
          <CIcon name="cil-indent-decrease" /> شماره سوال ها از 1 تا{" "}
          {numCourses} موجود است!
        </CLabel>
      </CRow>
      <CRow>
        {TextField({
          name: "سوال اول",
          colSize: 6,
          text: "شماره سوال اول را وارد کنید",
          input: FormNumberInput(
            form,
            setForm,
            "firstId",
            "شماره سوال ",
            0,
            numCourses,
            () => form.firstId > "0" && form.firstId <= numCourses
          ),
        })}
        {TextField({
          name: "سوال دوم",
          colSize: 6,
          text: "شماره سوال دوم را وارد کنید",
          input: FormNumberInput(
            form,
            setForm,
            "secondId",
            "شماره سوال ",
            0,
            numCourses,
            () => form.secondId > "0" && form.secondId <= numCourses
          ),
        })}
      </CRow>
      {!btnActice ? (
        <CButton type="submit" size="sm" color="primary" onClick={handleSubmit}>
          جا به جایی سوال
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

export default SwitchQuestions;
