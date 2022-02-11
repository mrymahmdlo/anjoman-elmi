import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardFooter,
  CCardHeader,
  CContainer,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Toast } from "src/Utility/Toast";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";
import DownloadExcelForm from "./Components/DownloadExcelForm";
import { APIBoardcastDownloadExcel } from "src/Service/APIBroadCast";

export default function DownloadExcel() {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  // todo
  // either use it or delete it!
  //const [errorContent, setErrorContent] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const [body, setBody] = useState({});

  useEffect(() => {
    if (form.fromTime) setBody({fromTime: HejriToDotNetGeorgian(form.fromTime)});
    if (form.toTime) setBody({toTime: HejriToDotNetGeorgian(form.toTime)});
  }, [form]);
  // const body={};
  // if(form.fromTime) body.fromTime = HejriToDotNetGeorgian(form.fromTime);
  // if(form.toTime) body.toTime = HejriToDotNetGeorgian(form.toTime);

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    // todo
    // add service
    // add loadin if needed
    APIBoardcastDownloadExcel("Admin/TutoringOrderReport", body).then(() =>
      setBtnActive(false)
    );
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>دانلود گزارش اکسل</CCardHeader>
          <p
            style={{
              margin: "1em 1em -1em 0",
              color: "#777",
              fontSize: "14px",
            }}
          >
            پر کردن همه ی فیلد ها ضروری نیست.
          </p>
          <DownloadExcelForm
            form={form}
            setForm={setForm}
          />
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
      <Toast showError={showError} errorContent={"errorContent"} />
    </div>
  );
}
