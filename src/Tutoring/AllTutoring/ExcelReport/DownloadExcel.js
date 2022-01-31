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
import { PostDataBroad } from "src/Service/APIBroadCast";
import { Toast } from "src/Utility/Toast";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";
import {  PostData } from "../../../Service/APIEngine";
import DownloadExcelForm from "./Components/DownloadExcelForm";


export default function DownloadExcel( setModal) {
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

 

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    PostDataBroad(`Tutoring/ExportCsv`, {
      FromTime: "2021-01-15T18:43:24.972Z",
      ToTime: "2022-01-23T18:43:24.972Z",
      studentId: 21500,
      providerId: 4214,

      // providerId: +form.providerId,
      // studentId: +form.studentId,
      // FromTime: HejriToDotNetGeorgian(form.FromTime),
      // ToTime: HejriToDotNetGeorgian(form.ToTime),
    })
      .then((res) => {
      
           const linkSource = `data:csv;base64,${res}`;
           const downloadLink = document.createElement("a");
           downloadLink.href = linkSource;
           downloadLink.download = 'Tutorings-1400%2F11%2F07.csv';
           downloadLink.click();
    
          setErrorContent("داده با موفقیت ثبت شد ");
          setModal(false);
      })
      .catch(() => {
      
        setShowError(true);
        setBtnActive(false);
      });
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
