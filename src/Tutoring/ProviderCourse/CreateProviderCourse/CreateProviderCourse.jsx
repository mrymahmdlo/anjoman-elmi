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
// import { CheckForm } from "./Components/CheckForm";
import { PostData } from "src/Service/APIEngine";
import { Toast } from "src/Utility/Toast";
import { GetDotNetGeorgianFromDateJS } from "src/Utility/DateTime";
import ProviderCourseForm from "./ProviderCourseForm";
import { useHistory } from "react-router";

const CreateProviderCourse = () => {
  const now = new Date();
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);
  const history = useHistory();
  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    PostData("ProviderCourse/CreateProviderCourse", form)
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
        history.push("/ProviderCourse/ProviderCourse");
        setShowError(true);
        setBtnActive(false);
      })
      .catch(() => {
        setErrorContent("خطا در ثبت محتوا");
        setShowError(true);
        setBtnActive(false);
      });
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>ساخت درس مشاور</CCardHeader>
          <ProviderCourseForm form={form} setForm={setForm} />
          <CCardFooter>
            {!btnActice ? (
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={submitContent}
              >
                <CIcon name="cil-scrubber" /> ثبت
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

export default CreateProviderCourse;
