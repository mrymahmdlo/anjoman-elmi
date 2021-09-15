import React, { useEffect, useState } from "react";
import {
  CButton,
  CCardBody,
  CCardFooter,
  CForm,
  CLabel,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { GetData } from "src/Service/APIEngine";
import {
  GroupIdSelect,
  QuizInfoFormItems,
} from "../Components/QuizInfo/QuizInfoFormItems";
import { CKEditorField, SwitchField, TextField } from "src/Utility/InputGroup";
import { CheckValidationArry } from "src/reusable/CheckValidationArry";
import {
  InitialForm,
  QuizInfoValidators,
} from "../Components/QuizInfo/QuizInfoValidators";
import ExamService from "src/Exam/ExamService/ExamService";

const QuizInfoForm = ({ setShowError, setErrorContent, userId, setQuizId }) => {
  const [form, setForm] = useState(InitialForm(userId));
  const [btnActice, setBtnActive] = useState(false);
  const [groupIds, setGroupIds] = useState([]);
  useEffect(() => {
    GetData("BasicInfo/Groups").then((res) => setGroupIds(res));
  }, []);

  const items = QuizInfoFormItems(form, setForm).map((item) => TextField(item));
  const switches = QuizInfoFormItems(form, setForm)
    .slice(8, 14)
    .map((item) => SwitchField(item));

  const handleSubmit = () => {
    setShowError(false);
    setBtnActive(true);
    if (!CheckValidationArry(form, QuizInfoValidators)) {
      setErrorContent("لطفا فیلد های قرمز شده را پر یا اصلاح کنید");
      setShowError(true);
      setBtnActive(false);
      return;
    }
    if (!form.GroupCodes[0]) {
      setErrorContent("گروه آزمایشی آزمون را انتخاب کنید");
      setShowError(true);
      setBtnActive(false);
      return;
    }
    ExamService.CreateQuizInfo(form)
      .then((res) => {
        setErrorContent("داده با موفقیت ثبت شد ");
        setQuizId(res.data);
      })
      .catch(() => {
        setErrorContent("خطا در ثبت آزمون");
      })
      .finally(() => {
        setShowError(true);
        setBtnActive(false);
      });
  };
  return (
    <>
      {" "}
      <CCardBody>
        <CForm action="" method="post">
          <CRow>{items.slice(0, 3)}</CRow>
          <CRow>
            {GroupIdSelect(groupIds, form, setForm)}
            {items.slice(3, 5)}
          </CRow>
          <CRow>{items.slice(5, 8)}</CRow>
          <CLabel htmlFor="nf-title">
            با فعال کردن کلید های زیر، با توضیحات گفته شده موافق هستید
          </CLabel>
          <CRow>{switches}</CRow>
          {CKEditorField(
            "توضیحات آزمون(الزامی است)",
            "لطفا درمورد آزمون توضیحات لازم را بنویسید",
            setForm,
            form,
            "QuizDescription"
          )}
        </CForm>
      </CCardBody>
      <CCardFooter>
        {!btnActice ? (
          <CButton
            type="submit"
            size="sm"
            color="primary"
            onClick={handleSubmit}
          >
            <CIcon name="cil-scrubber" /> ثبت اطلاعات آزمون و مرحله بعد
          </CButton>
        ) : (
          <CSpinner
            style={{ width: "2rem", height: "2rem" }}
            color="primary"
            variant="grow"
          />
        )}
      </CCardFooter>
    </>
  );
};

export default QuizInfoForm;
