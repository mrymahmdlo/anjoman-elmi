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
import { APIBoardcastDownloadExcel } from "src/Service/APIBroadCast";

export default function DownloadExcel() {
  const [form, setForm] = useState({});
  // todo
  // either use it or delete it!
  //const [errorContent, setErrorContent] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const [providers, setProviders] = useState([]);
  // const [body, setBody] = useState({});

  useEffect(() => {
    // todo
    // add service
    // add loading
    APICorePost("Provider/Tutoring").then((res) => {
      setProviders(res.data);
    });
  }, []);

  // useEffect(() => {
  //   if (form.providerId) setBody({ providerId: +form.providerId });
  //   if (form.FromTime) setBody({FromTime: HejriToDotNetGeorgian(form.FromTime)});
  //   if (form.ToTime) setBody({ToTime: HejriToDotNetGeorgian(form.ToTime)});
  // }, [form]);
  const body={};
  if(form.fromTime) body.fromTime = HejriToDotNetGeorgian(form.fromTime);
  if(form.toTime) body.toTime = HejriToDotNetGeorgian(form.toTime);

  const submitContent = () => {
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
    </div>
  );
}
