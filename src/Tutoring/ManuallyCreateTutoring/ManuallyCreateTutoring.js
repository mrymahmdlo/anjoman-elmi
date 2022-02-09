import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardFooter,
  CCardHeader,
  CContainer,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { APIBoardcastPost } from "../../Service/APIBroadCast";
import { Toast } from "src/Utility/Toast";
import ManuallyCreateTutoringForm from "./Components/TutoringForm";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";

export default function ManuallyCreateTutoring() {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActive, setBtnActive] = useState(false);

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload(false);
    }, 2000);
  };

  const checkPhoneNumber = () => {
    if (form.userPhoneNumbe)
    return (
      form.userPhoneNumber[0] === "0" &&
      form.userPhoneNumber[1] === "9" &&
      form.userPhoneNumber?.length === 11
    );
  };

  const postData = () => {
    setShowError(false);
    setBtnActive(true);
    APIBoardcastPost("Admin/RetakeTutoring", {
      providerId: +form.providerId,
      userPhoneNumber: form.userPhoneNumber,
      productId: +form.productId,
      isOnline: form.isOnline !== 0,
      startDate: HejriToDotNetGeorgian(form.startDate),
    })
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
        setShowError(true);
        setBtnActive(false);
        refreshPage();
      })
      .catch(() => {
         setErrorContent("ثبت داده ها با مشکل مواجه شد");
        setShowError(true);
        setBtnActive(false);
      });
  };

  const submitContent = () => {
    checkPhoneNumber()
      ? postData()
      : setErrorContent("لطفا فیلد های  ضروری را پر یا اصلاح کنید");
    setShowError(true);
    setBtnActive(false);
    postData();
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>برگزاری دستی جلسه</CCardHeader>
          <ManuallyCreateTutoringForm form={form} setForm={setForm} />
          <CCardFooter>
            {!btnActive ? (
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={submitContent}
              >
                <CIcon name="cil-scrubber" /> ثبت جلسه ی آموزشی
              </CButton>
            ) : (
              <CSpinner
                style={{ width: "2rem", height: "2rem" }}
                color="info"
                variant="grow"
              />
            )}
          </CCardFooter>
        </CCard>
      </CContainer>
      <Toast showError={showError} errorContent={errorContent} />
    </div>
  );
}
