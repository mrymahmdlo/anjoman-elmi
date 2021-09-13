import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CContainer,
  CForm,
  CLabel,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { GetData } from "src/Service/APIEngine";
import { Toast } from "src/Utility/Toast";
import { TokenManager } from "src/Identity/Service/TokenManager";
import { GroupIdSelect, InfoFormItems } from "./Components/InfoFormItems";
import { CKEditorFild, SwitchFild, TextFild } from "../../Utility/InputGroup";
import { CheckValidationArry } from "src/reusable/CheckValidationArry";
import { validator } from "./Components/Validators";
import ExamService from "../ExamService/ExamService";

const CreateExam = () => {
  const { GetUserId } = TokenManager();
  const [form, setForm] = useState({
    UserId: +GetUserId(),
    IsLock: false,
    IsValid: false,
    GroupCodes: [],
    StartDate: null,
    ResultDate: null,
    EndDate: null,
    ShowResultImmediately: true,
    QuestionFileReady: false,
    AnswerFileReady: false,
  });
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);
  const [groupIds, setGroupIds] = useState([]);
  useEffect(() => {
    GetData("BasicInfo/Groups").then((res) => setGroupIds(res));
  }, []);

  useEffect(() => {
    if (showError) setTimeout(() => setShowError(false), 3200);
  }, [showError]);

  const items = InfoFormItems(form, setForm).map((item) => TextFild(item));
  const switches = InfoFormItems(form, setForm)
    .slice(8, 14)
    .map((item) => SwitchFild(item));

  const handleSubmit = () => {
    setShowError(false);
    setBtnActive(true);
    if (!CheckValidationArry(form, validator)) {
      setErrorContent("لطفا فیلد های قرمز شده را پر یااصلاح کنید");
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
        console.log(res);
        setShowError(true);
        setBtnActive(false);
      })
      .catch((err) => {
        setErrorContent("لطفا فیلد های ضروری را پر کنید");
        setShowError(true);
        setBtnActive(false);
      });
  };
  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>
            ایجاد آزمون جدید /<small> تعریف اطلاعات</small>
          </CCardHeader>
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
              {CKEditorFild(
                "توضیحات آزمون",
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
                <CIcon name="cil-scrubber" /> ثبت آزمون و مرحله بعد
              </CButton>
            ) : (
              <CSpinner
                style={{ width: "2rem", height: "2rem" }}
                color="primary"
                variant="grow"
              />
            )}
          </CCardFooter>
        </CCard>
      </CContainer>
      <Toast showError={showError} errorContent={errorContent} />
    </div>
  );
};

export default CreateExam;
