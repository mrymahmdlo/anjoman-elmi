import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardFooter,
  CCardHeader,
  CContainer,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { PostData } from "src/Service/APIWebinar";
import { TokenManager } from "src/Identity/Service/TokenManager";
import { Toast } from "src/Utility/Toast";
import { GetDotNetGeorgianFromDateJS } from "src/Utility/DateTime";
import WebinarForm from "./Components/WebinarForm";

const CreateWebinar = () => {
  const { GetUserId } = TokenManager();
  const now = new Date();
  const [form, setForm] = useState({
    // writerProviderId: GetUserId(),
    // createdDateTime: GetDotNetGeorgianFromDateJS(now),
    priceAfterHolding: 0,
    capacity: 0,
    schedules: [
      {
        startDateTime: "",
        endDateTime: "",
        subject: "",
      },
    ],
  });
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    PostData("Webinar/Create",form )
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
        setShowError(true);
        setBtnActive(false);
      })
      .catch(() => {
        setErrorContent("لطفا فیلد های ضروری را پر کنید");
        setShowError(true);
        setBtnActive(false);
      });
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>
            ساخت همایش
          </CCardHeader>
          <WebinarForm form={form} setForm={setForm} />
          <CCardFooter>
            {!btnActice ? (
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={submitContent}
              >
                <CIcon name="cil-scrubber" /> ثبت همایش
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

export default CreateWebinar;
