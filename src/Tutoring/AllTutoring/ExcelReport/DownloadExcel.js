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
import { PostDataBroad } from "src/Service/APIBroadCast";
import { Toast } from "src/Utility/Toast";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";
import {GetFileDownloadLink, PostData} from "../../../Service/APIEngine";
import DownloadExcelForm from "./Components/DownloadExcelForm";
import {Link} from "react-router-dom";

export default function DownloadExcel(data, setModal) {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const [providers, setProviders] = useState([]);
  const [link, setLink] = useState("");

  useEffect(() => {
    PostData("Provider/Tutoring", {}).then((res) => {
      setProviders(res.data);
    });
  }, []);

  useEffect(() => {
    setErrorContent("تا بارگزاری داده ها کمی صبر کنید");
    setShowError(true);
  }, [data]);

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    PostDataBroad(`Tutoring/ExportCsv`, {
      providerId: +form.providerId,
      studentId: +form.studentId,
      FromTime: HejriToDotNetGeorgian(form.FromTime),
      ToTime: HejriToDotNetGeorgian(form.ToTime),
    })
      .then((res) => {
        setLink(GetFileDownloadLink(res.data));
        if (res.data.succeeded === true) {
          setErrorContent("داده با موفقیت ثبت شد ");
          setModal(false);
        } else {
          setErrorContent(res.data.data);
        }
        setShowError(true);
        setBtnActive(false);
      })
      .catch(() => {
        setErrorContent("لطفا فیلد های  ضروری را پر یا اصلاح کنید");
        setShowError(true);
        setBtnActive(false);
      });
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>دانلود گزارش اکسل</CCardHeader>
          <DownloadExcelForm form={form} setForm={setForm} providers={providers} />
          <CCardFooter>
            {!btnActive ? (
              <Link to={link}>
                <CButton
                  type="submit"
                  size="sm"
                  color="primary"
                  onClick={submitContent}
                  download
                >
                  <CIcon name="cil-scrubber" /> دانلود فایل اکسل
                </CButton>
              </Link>
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
