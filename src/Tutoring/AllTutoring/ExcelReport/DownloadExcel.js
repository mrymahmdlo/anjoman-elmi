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
import { Toast } from "src/Utility/Toast";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";
import {  PostData } from "../../../Service/APIEngine";
import DownloadExcelForm from "./Components/DownloadExcelForm";
import {DownloadExcelReportBroad} from "src/Service/APIBroadCast";

export default function DownloadExcel() {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    PostData("Provider/Tutoring", {}).then((res) => {
      setProviders(res.data);
    });
  }, []);

  const body={};
  if(form.providerId) body.providerId = +form.providerId;
  if(form.studentId) body.studentId = +form.studentId;
  if(form.FromTime) body.FromTime = HejriToDotNetGeorgian(form.FromTime);
  if(form.ToTime) body.ToTime = HejriToDotNetGeorgian(form.ToTime);

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    DownloadExcelReportBroad('Tutoring/ExportCsv', body)
      .then(() => setBtnActive(false))
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>دانلود گزارش اکسل</CCardHeader>
          <DownloadExcelForm
            form={form}
            setForm={setForm}
            providers={providers}
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
      <Toast showError={showError} errorContent={errorContent} />
    </div>
  );
}
