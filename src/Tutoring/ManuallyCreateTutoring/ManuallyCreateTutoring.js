import React, {useState} from "react";
import {
  CButton,
  CCard,
  CCardFooter,
  CCardHeader,
  CContainer,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {PostDataWebinar} from "../../Service/APIWebinar";
import { Toast } from "src/Utility/Toast";
import TutoringForm from "./Components/TutoringForm";

export default function ManuallyCreateTutoring() {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActive, setBtnActive] = useState(false);

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    PostDataWebinar('Admin/RetakeTutoring', {
      providerId: form.providerId,
      userPhoneNumber: form.userPhoneNumber,
      productId: form.productId,
    })
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
        setShowError(true);
        setBtnActive(false);
      })
      .catch(() => {
        setErrorContent("ثبت داده ها با مشکل مواجه شد");
        setShowError(true);
        setBtnActive(false);
      });
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>برگزاری دستی جلسه</CCardHeader>
          <TutoringForm form={form} setForm={setForm}/>
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
