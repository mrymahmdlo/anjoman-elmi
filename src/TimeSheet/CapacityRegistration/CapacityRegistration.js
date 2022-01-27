import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardFooter,
  CCardHeader,
  CContainer,
  CSpinner,
  CCardSubtitle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { PostDataProvider } from "src/Service/APIProvider";
import { Toast } from "src/Utility/Toast";
import CapacityForm from "./Components/CapacityForm";
import { useHistory } from "react-router";

const CapacityRegistration = () => {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const history = useHistory();

  const submitTimeSheet = () => {
    setShowError(false);
    setBtnActive(true);
    PostDataProvider("TimeSheet/SetRechargeAmount", {
      providerId: Number(form.providerId),
      rechargeAmountHour: Number(form.rechargeAmountHour),
    })
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
        history.push("/TimeSheet/ManageTimeSheet");
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
          <CCardHeader>ظرفیت مدرس</CCardHeader>
          <CCardSubtitle className="p-3">
          در این بخش می توانید با صرف نظر از طول بازه، برای مدرس مورد نظر ظرفیت مخصوص تمام بازه های قابل تدریس او را تعیین کنید.
          </CCardSubtitle>
          <CapacityForm form={form} setForm={setForm} />
          <CCardFooter>
            {!btnActive ? (
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={submitTimeSheet}
              >
                <CIcon name="cil-scrubber" /> ثبت ظرفیت مدرس
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
};

export default CapacityRegistration;
