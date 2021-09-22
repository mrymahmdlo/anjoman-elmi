import React, { useEffect, useState } from "react";
import {
  CButton,
  CCardBody,
  CForm,
  CLabel,
  CRow,
  CCard,
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
import { QuizInfoValidators } from "../Components/QuizInfo/QuizInfoValidators";
import ExamService from "src/Exam/ExamService/ExamService";
import { ExamContext } from "../CreateNewExam";
import ExamCardFooter from "../Components/ExamCardFooter";
import { GeorgianToHejri } from "src/Utility/DateTime";
import AddFilesButtons from "../Components/QuizInfo/AddFilesButtons";

const EditQuizInfoForm = () => {
  const [form, setForm] = useState({});
  const [btnActice, setBtnActive] = useState(false);
  const [groupIds, setGroupIds] = useState([]);
  const exam = React.useContext(ExamContext);
  useEffect(() => {
    GetData("BasicInfo/Groups").then((res) => setGroupIds(res));
    setBtnActive(true);
    ExamService.GetQuizInfo(exam.quizId).then((res) => {
      let data = res.data;
      setForm({
        ...data,
        startDate: GeorgianToHejri(data.startDate),
        endDate: GeorgianToHejri(data.endDate),
        resultDate: GeorgianToHejri(data.resultDate),
      });
      setBtnActive(false);
    });
  }, [exam.quizId, exam]);
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
      <CLabel className="m-3">
        برای آپلود فایل سوالات، فایل پاسخ نامه و یا ویدیو مربوط به آزمون ، فایل
        را در محل مناسب آپلود کنید.
      </CLabel>
      <CCard className="m-2">
        <CCardBody>
          <CRow>
            <AddFilesButtons />
          </CRow>
        </CCardBody>
      </CCard>
      <CLabel className="m-3">
        اطلاعات قابل تغییر آزمون را در این مرحله به روز رسانی کنید.
      </CLabel>
      <CCard className="m-2">
        <CCardBody>
          <CForm action="" method="post">
            <CRow>
              {items.slice(0, 3)}
              <QuizModeSelect form={form} setForm={setForm} />
            </CRow>
            <CRow>
              {GroupIdSelect(groupIds, form, setForm)}
              {items.slice(3, 5)}
            </CRow>
            <CRow>
              {items.slice(5, 8)}
              {switches[1]}
            </CRow>
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
      </CCard>
      <ExamCardFooter />
    </>
  );
};

export default EditQuizInfoForm;
