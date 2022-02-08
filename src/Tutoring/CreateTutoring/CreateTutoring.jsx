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
import { PostDataBroad } from "src/Service/APIBroadCast";
import { Toast } from "src/Utility/Toast";
import CreateTutoringForm from "./Components/TuturingForm";
import { useHistory } from "react-router";

const CreateWebinar = () => {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);
  const history = useHistory();
  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    PostDataBroad("Tutorial/Create", {
      groupId: +form.groupId,
      courseId: +form.courseId,
      totalMinute: +form.totalMinute,
      title: form.title,
      description: '',
      minProviderRank: +form.minProviderRank,
      maxProviderRank: +form.maxProviderRank,
      price: +form.price,
      isOffline: form.isOffline !== 0,
    })
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
                history.push("/Tutoring/ManageTutoring");
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
          <CCardHeader>ساخت تدریس خصوصی</CCardHeader>
          <CreateTutoringForm form={form} setForm={setForm} />
          <CCardFooter>
            {!btnActice ? (
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={submitContent}
              >
                <CIcon name="cil-scrubber" /> ثبت تدریس خصوصی
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
