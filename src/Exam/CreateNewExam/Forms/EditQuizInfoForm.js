import React, { useEffect, useState } from "react";
import { CButton, CCardBody, CForm, CRow, CSpinner } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { GetData } from "src/Service/APIEngine";
import {
  GroupIdSelect,
  QuizInfoFormItems,
  QuizModeSelect,
} from "../Components/QuizInfo/QuizInfoFormItems";
import { TextField } from "src/Utility/InputGroup";
import { CheckValidationArry } from "src/reusable/CheckValidationArry";
import { QuizInfoValidators } from "../Components/QuizInfo/QuizInfoValidators";
import ExamService from "src/Exam/ExamService/ExamService";
import { ExamContext } from "../CreateNewExam";
import ExamCardFooter from "../Components/ExamCardFooter";

const EditQuizInfoForm = () => {
  const [form, setForm] = useState({});
  const [btnActice, setBtnActive] = useState(false);
  const [groupIds, setGroupIds] = useState([]);
  const exam = React.useContext(ExamContext);
  useEffect(() => {
    GetData("BasicInfo/Groups").then((res) => setGroupIds(res));
    ExamService.GetQuizInfo(exam.quizId).then((res) => {
      setForm(res.data);
    });
  }, [exam.quizId]);
  console.log(form);
  const items = QuizInfoFormItems(form, setForm).map((item) => TextField(item));

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
    ExamService.UpdateQuizInfo(exam.quizId, form)
      .then((res) => {
        if (res.success) {
          exam.setErrorContent("آزمون با موفقیت به روز رسانی شد ");
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
        <CForm action="" method="post">
          <CRow>
            {items.slice(0, 3)} <QuizModeSelect form={form} setForm={setForm} />
          </CRow>
          <CRow>
            {GroupIdSelect(groupIds, form, setForm)}
            {items.slice(3, 5)}
          </CRow>
          <CRow>{items.slice(5, 8)}</CRow>
        </CForm>
        {!btnActice ? (
          <CButton
            type="submit"
            size="sm"
            color="primary"
            onClick={handleSubmit}
          >
            <CIcon name="cil-scrubber" /> ثبت تغییرات
          </CButton>
        ) : (
          <CSpinner
            style={{ width: "2rem", height: "2rem" }}
            color="primary"
            variant="grow"
          />
        )}
      </CCardBody>
      <ExamCardFooter />
    </>
  );
};

export default EditQuizInfoForm;
