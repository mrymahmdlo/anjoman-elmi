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
import { APIProviderPost } from "src/Service/APIProvider";
import { ToastContext } from "src/containers/TheContent";
import CapacityForm from "./Components/CapacityForm";

const CapacityRegistration = () => {
  const [form, setForm] = useState({ providerId: 0, rechargeAmountHour: 0 });
  const [btnActive, setBtnActive] = useState(false);
  const toast = React.useContext(ToastContext);

  const refreshPage = () => {
    setTimeout(() => {
       window.location.reload(false);
    //todo
    }, 2000); // bad solution!!!!!!!!!!!!! remove and find better way
    // hint : see update data from Minute call
  };

  const submitTimeSheet = () => {
    setBtnActive(true);
    // todo
    // add service
    APIProviderPost("TimeSheet/SetRechargeAmount", {
      providerId: Number(form.providerId),
      rechargeAmountHour: Number(form.rechargeAmountHour),
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

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>ظرفیت مدرس</CCardHeader>
          <CCardSubtitle className="p-3">
            در این بخش می توانید برای مدرس مورد نظر ظرفیت مخصوص تمام بازه های
            قابل تدریس او را تعیین کنید.
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
    </div>
  );
};

export default CapacityRegistration;
