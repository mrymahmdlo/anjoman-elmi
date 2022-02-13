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
import { ToastContext } from "src/containers/TheContent";
import ManuallyCreateTutoringForm from "./Components/TutoringForm";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";

export default function ManuallyCreateTutoring() {
  const [form, setForm] = useState({});
  const toast = React.useContext(ToastContext);
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
    setBtnActive(true);
    APIBoardcastPost("Admin/RetakeTutoring", {
      providerId: +form.providerId,
      userPhoneNumber: form.userPhoneNumber,
      productId: +form.productId,
      isOnline: form.isOnline !== 0,
      startDate: HejriToDotNetGeorgian(form.startDate),
    })
      .then(() => {
        toast.showToast("داده با موفقیت ثبت شد ");
        setBtnActive(false);
        refreshPage();
      })
      .catch(() => {
        toast.showToast("ثبت داده ها با مشکل مواجه شد");
        setBtnActive(false);
      });
  };

  const submitContent = () => {
    checkPhoneNumber()
      ? postData()
      : toast.showToast("لطفا فیلد های  ضروری را پر یا اصلاح کنید");
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
    </div>
  );
}
