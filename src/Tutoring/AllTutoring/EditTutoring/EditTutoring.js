import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardFooter,
  CCardHeader,
  CContainer,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {  PostDataBroad } from "src/Service/APIBroadCast";
import { Toast } from "src/Utility/Toast";
import TuturingForm from "./Components/TutoringForm";
import { ChangeValues } from "./Components/ChangeValues";
import { GeorgianToHejri } from "src/Utility/DateTime";

const EditTutoring = ({ obj, setModal }) => {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);

  useEffect(() => {
    console.log('obj',obj)
    setErrorContent("تا بارگزاری داده ها کمی صبر کنید");
    setShowError(true);
    setForm(obj);
  }, [obj]);
   console.log("11", form.startDateRange);
  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    let data = form;
    console.log('kk',form.startDateRange);
    PostDataBroad("Tutoring/BuyTutoring", {
      providerId: +form.providerId,
      studentId: +form.studentId,
      tutorialId: +form.tutorialId,
      isOnline: form.isOnline,
      startDateRange: GeorgianToHejri(form.startDateRange),
      durationMinutes: +form.durationMinutes,
    })
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
        setShowError(true);
        setBtnActive(false);
        setModal(false);
      })
      .catch(() => {
        setErrorContent("خطا در ثبت ویرایش");
        setShowError(true);
        setBtnActive(false);
      });
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>  تدریس خصوصی مجدد</CCardHeader>
          <TuturingForm form={form} setForm={setForm}  />
          <CCardFooter>
            {!btnActice ? (
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={submitContent}
              >
                <CIcon name="cil-scrubber" /> ثبت تدریس خصوصی
              </CButton>
            ) : (
              <CSpinner
                style={{ width: "2rem", height: "2rem" }}
                color=""
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

export default EditTutoring;
