import React, {useEffect, useState} from "react";
import {
  CButton,
  CCard,
  CCardFooter,
  CCardHeader,
  CContainer,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DownloadExcelForm } from "./DownloadExcelForm";
import { ToastContext } from "src/containers/TheContent";
import { APIBoardcastDownloadExcel } from "src/Service/APIBroadCast";
import { GeorgianToHejri } from "src/Utility/DateTime";

export default function DownloadExcel() {
  const [form, setForm] = useState({
    webinarIds: [],
    subscriberType: NaN,
  });
  const [btnActive, setBtnActive] = useState(false);

  const toast = React.useContext(ToastContext);
  useEffect(() => {
    toast.showToast("تا بارگزاری داده ها کمی صبر کنید");
  }, []);

  const submitContent = () => {
    setBtnActive(true);
    // todo
    // add service
    APIBoardcastDownloadExcel(
      "webinar/GetSubscriptionsExcel",
      {
        webinarIds: form.webinarIds,
        subscriberType: form.subscriberType === "true" ? 1 : 0,
      },
      `Subscriptions-${GeorgianToHejri(new Date())}.csv`)
      .then(() => setBtnActive(false));
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>دانلود گزارش اکسل</CCardHeader>
          <DownloadExcelForm form={form} setForm={setForm}/>
          <CCardFooter>
            {!btnActive ? (
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={submitContent}
                download
              >
                <CIcon name="cil-scrubber" /> دانلود فایل اکسل
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
    </div>
  );
}
