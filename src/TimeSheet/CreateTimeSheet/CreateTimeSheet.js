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
import { PostDataProvider } from "src/Service/APIProvider";
import { Toast } from "src/Utility/Toast";
import TimeSheetForm from "./Components/TimeSheetForm";
import { useHistory } from "react-router";

const CreateTimeSheet = () => {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const history = useHistory();

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    PostDataProvider("TimeSheet/AddTimeSheet", {
      startPeriodHour: form.startPeriodHour,
      endPeriodHour: form.endPeriodHour,
      weekDay: form.weekDay,
    })
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
        history.push("/TimeSheet/ManageTimeSheet");
        setShowError(true);
        setBtnActive(false);
      })
      .catch(() => {
        setErrorContent("ثبت داده ها با مشکل مواجه شد");
        setShowError(true);
        setBtnActive(false);
      });
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>ساخت زمان بندی</CCardHeader>
          <TimeSheetForm form={form} setForm={setForm} />
          <CCardFooter>
            {!btnActive ? (
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={submitContent}
              >
                <CIcon name="cil-scrubber" /> ثبت زمان بندی
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

export default CreateTimeSheet;
