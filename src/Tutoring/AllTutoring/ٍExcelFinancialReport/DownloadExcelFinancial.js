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
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";
import DownloadExcelForm from "./Components/DownloadExcelForm";
import { APIBoardcastDownloadExcel } from "src/Service/APIBroadCast";

export default function DownloadExcel() {
  const [form, setForm] = useState({
    fromTime: "",
    toTime: "",
  });
  // todo
  const [btnActive, setBtnActive] = useState(false);

  useEffect(() => {
    setForm({
      fromTime: null,
      toTime: null,
    });
  }, []);

  const submitContent = () => {
    setBtnActive(true);
    // todo
    // add service
    // add loadin if needed
    APIBoardcastDownloadExcel("Admin/TutoringOrderReport", {
      fromTime: HejriToDotNetGeorgian(form.fromTime),
      toTime: HejriToDotNetGeorgian(form.toTime),
    }).finally(() => setBtnActive(false));
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
          <DownloadExcelForm form={form} setForm={setForm} />
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
