import React, { useState } from "react";
import ExamService from "../../../ExamService/ExamService";
import { TextField } from "src/Utility/InputGroup";
import { ExamContext } from "../../CreateNewExam";
import { ToastContext } from "src/containers/TheContent";
import { FormNumberInput } from "src/reusable/FormInput";
import CIcon from "@coreui/icons-react";
// todo
// change it to import
const { CCardBody, CRow, CButton, CSpinner, CLabel } = require("@coreui/react");

const SwitchQuizDetails = ({ numCourses, setUpdated }) => {
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
    ExamService.SwapQuizDetail(form)
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
          برای جا به جایی دو زیر آزمون ثبت شده، شماره سطر آن را در فرم زیر وارد
          کنید.
        </CLabel>

        <CLabel>
          {" "}
          <CIcon name="cil-indent-decrease" /> شماره زیر آزمون ها از 1 تا{" "}
          {numCourses} موجود است!
        </CLabel>
      </CRow>
      <CRow>
        {TextField({
          name: "زیرآزمون اول",
          colSize: 6,
          text: "شماره زیرآزمون اول را وارد کنید",
          input: FormNumberInput(
            form,
            setForm,
            "firstId",
            "شماره زیرآزمون ",
            0,
            numCourses,
            () => form.firstId > "0" && form.firstId <= `${numCourses}`
          ),
        })}
        {TextField({
          name: "زیرآزمون دوم",
          colSize: 6,
          text: "شماره زیرآزمون دوم را وارد کنید",
          input: FormNumberInput(
            form,
            setForm,
            "secondId",
            "شماره زیرآزمون ",
            0,
            numCourses,
            () => form.secondId > "0" && form.firstId <= `${numCourses}`
          ),
        })}
      </CRow>
      {!btnActice ? (
        <CButton type="submit" size="sm" color="primary" onClick={handleSubmit}>
          جا به جایی زیرآزمون
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

export default SwitchQuizDetails;
