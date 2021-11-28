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
import {
  GroupIdSelect,
  QuizInfoFormItems,
  QuizModeSelect,
  QuizTypeSelect,
} from "../Components/QuizInfo/QuizInfoFormItems";
import { SwitchField, TextField } from "src/Utility/InputGroup";
import { CheckValidationArry } from "src/reusable/CheckValidationArry";
import { QuizInfoValidators } from "../Components/QuizInfo/QuizInfoValidators";
import ExamService from "src/Exam/ExamService/ExamService";
import { ExamContext } from "../CreateNewExam";
import { GeorgianToHejri } from "src/Utility/DateTime";
import AddFilesButtons from "../Components/QuizInfo/AddFilesButtons";

const EditQuizInfoForm = () => {
  const [form, setForm] = useState({});
  const [btnActice, setBtnActive] = useState(false);
  const [groupIds, setGroupIds] = useState([]);
  const exam = React.useContext(ExamContext);
  useEffect(() => {
    ExamService.GetDropDowns().then((res) => setGroupIds(res.data.groupCode.options));
  }, []);
  useEffect(() => {
    setBtnActive(true);
    ExamService.GetQuizInfo(exam.quizId).then((res) => {
      console.log('res',res)
      let data = res.data;
      setForm({
        ...data,
        startDate: GeorgianToHejri(data.startDate),
        endDate: GeorgianToHejri(data.endDate),
        resultDate: GeorgianToHejri(data.resultDate),
      });
      setBtnActive(false);
      exam.setQuizMode(+data.quizMode);
      exam.setQuizType(+data.quizType);
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
          exam.setQuizMode(+form.quizMode);
          exam.setQuizType(+form.quizType);
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
        را در محل مناسب آپلود کنید(نیاز به ثبت تغییرات پس از بارگزاری فایل ها
        نیست تنها بعد از قرار دادن آدرس دانلود فیلم حل سوال، ثبت را بزنید).
      </CLabel>
      <CCard className="m-2">
        <CCardBody>
          <CRow>
            <AddFilesButtons />
          </CRow>
        </CCardBody>
      </CCard>
      <CLabel className="m-3">
        اطلاعات قابل تغییر آزمون را در این مرحله به روز رسانی کنید.و هنگامی که
        آزمون به صورت کامل تکمیل شد،
        <strong>حالت تست را خاموش و روی ثبت تغییرات کلیک کنید.!</strong>
      </CLabel>
      <CCard className="m-2">
        <CCardBody>
          <CForm action="" method="post">
            <CRow>
              {items.slice(0, 3)}
              <QuizModeSelect form={form} setForm={setForm} />
              <QuizTypeSelect form={form} setForm={setForm} />
            </CRow>
            <CRow>
              {GroupIdSelect(groupIds, form, setForm)}
              {items.slice(3, 5)}
            </CRow>
            <CRow>{items.slice(5, 8)}</CRow>
            <CRow>{switches}</CRow>
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
      <CLabel className="m-3 text-danger">
        پس از اتمام بررسی و ثبت موارد مورد نیاز آزمون، حتما روی اتمام ویرایش
        آزمون کلیک کنید تا آزمون آماده برگزاری شود.
        <strong>
          دکمه ثبت تغییرات بالا بدون کلیک کردن روی اتمام ثبت آزمون، اصلاحات را
          روی آزمون اعمال نخواهد کرد!
        </strong>
      </CLabel>
    </>
  );
};

export default EditQuizInfoForm;
