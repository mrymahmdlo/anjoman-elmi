import React, { useEffect, useState } from "react";
import {
  CButton,
  CCardBody,
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
  QuizModeSelect,
} from "../Components/QuizInfo/QuizInfoFormItems";
import { SwitchField, TextField } from "src/Utility/InputGroup";
import { CheckValidationArry } from "src/reusable/CheckValidationArry";
import {
  InitialForm,
  QuizInfoValidators,
} from "../Components/QuizInfo/QuizInfoValidators";
import ExamService from "src/Exam/ExamService/ExamService";
import { ExamContext } from "../CreateNewExam";
import { CKEditorField } from "src/reusable/CKEditorInput";

const QuizInfoForm = ({ userId, setQuizId }) => {
  const [form, setForm] = useState(InitialForm(userId));
  const [btnActice, setBtnActive] = useState(false);
  const [groupIds, setGroupIds] = useState([]);
  const exam = React.useContext(ExamContext);
  useEffect(() => {
    GetData("BasicInfo/Groups").then((res) => setGroupIds(res));
  }, []);

  const items = QuizInfoFormItems(form, setForm).map((item) => TextField(item));
  const switches = QuizInfoFormItems(form, setForm)
    .slice(8, 14)
    .map((item) => SwitchField(item));

  const afterCheck = (text) => {
    exam.setErrorContent(text);
    exam.setShowError(true);
    setBtnActive(false);
  };

  const handleSubmit = () => {
    exam.setShowError(false);
    setBtnActive(true);
    if (!CheckValidationArry(form, QuizInfoValidators)) {
      return afterCheck("لطفا فیلد های قرمز شده را پر یا اصلاح کنید");
    }
    if (!form.groupCodes[0]) {
      return afterCheck("گروه آزمایشی آزمون را انتخاب کنید");
    }
    ExamService.CreateQuizInfo(form)
      .then((res) => {
        if (res.success) {
          exam.setErrorContent("داده با موفقیت ثبت شد ");
          setQuizId(res.data);
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
    <>
      <CCardBody>
        <CLabel className="mb-4">
          در این فرم اطلاعات آزمون را وارد کنید.لطفا پس از انتخاب تاریخ و ساعت،
          از صحت اطلاعات وارد شده اطمینان پیدا کنید.
        </CLabel>
        <CForm action="" method="post">
          <CRow>
            {items.slice(0, 3)} <QuizModeSelect form={form} setForm={setForm} />
          </CRow>
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
            "توضیحات آزمون",
            "لطفا درمورد آزمون توضیحات لازم را بنویسید",
            setForm,
            form,
            "quizDescription"
          )}
        </CForm>
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
      </CCardBody>
    </>
  );
};

export default QuizInfoForm;
