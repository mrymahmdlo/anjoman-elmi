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
import { APICorePost } from "../../../Service/APIBase";
import DownloadExcelForm from "./Components/DownloadExcelForm";
import { ToastContext } from "src/containers/TheContent";
import { APIBoardcastDownloadExcel } from "src/Service/APIBroadCast";

export default function DownloadExcel() {
  const [form, setForm] = useState({ FromTime: null, ToTime: null });
  // todo
  // either use it or delete it!
  const [btnActive, setBtnActive] = useState(false);
  const [providers, setProviders] = useState([]);
  const toast = React.useContext(ToastContext);
  // const [body, setBody] = useState({});

  useEffect(() => {
    // todo
    // add service
    // add loading
    toast.showToast("تا بارگزاری داده ها کمی صبر کنید");
    APICorePost("Provider/Tutoring").then((res) => {
      setProviders(res.data);
    });
  }, []);

  const submitContent = () => {
    setBtnActive(true);
    // todo
    // add service
    // add loadin if needed
    let body = {
      providerId: +form.providerId > 0 ? +form.providerId : null,
      FromTime: form.FromTime ? HejriToDotNetGeorgian(form.FromTime) : null,
      ToTime: form.ToTime ? HejriToDotNetGeorgian(form.ToTime) : null,
    };
    // todo
    // duplicate funxtion, may used again -> make it a function in utility as RemoveNullKeys
    body = Object.fromEntries(
      Object.entries(body).filter(([_, v]) => v != null)
    );
    APIBoardcastDownloadExcel("Tutoring/ExportCsv", body).then(() =>
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
    </div>
  );
}
