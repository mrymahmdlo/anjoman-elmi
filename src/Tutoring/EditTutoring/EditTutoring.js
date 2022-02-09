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
import {  APIBoardcastPost } from "src/Service/APIBroadCast";
import { Toast } from "src/Utility/Toast";
import CreateTutoringForm from "src/Tutoring/CreateTutoring/Components/TuturingForm";
import { ChangeValuesEditTutoring } from "./Components/ChangeValues";

const EditTutoring = ({ obj, setModal }) => {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);

  useEffect(() => {
    setErrorContent("تا بارگزاری داده ها کمی صبر کنید");
    setShowError(true);
    setForm(ChangeValuesEditTutoring(obj));
  }, [obj]);

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    APIBoardcastPost(`Tutorial/Update?tutorialId=${obj.tutorialId}`, {
      groupId: +form.groupId,
      courseId: +form.courseId,
      totalMinute: +form.totalMinute,
      title: form.title,
      description: "",
      minProviderRank: +form.minProviderRank,
      maxProviderRank: +form.maxProviderRank,
      // where is isOffline?
      price: 0,
    })
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
        setShowError(true);
        setBtnActive(false);
        setModal(false);
      })
      .catch(() => {
        setErrorContent("خطا در ثبت ویرایش");
        setShowError(true);
        setBtnActive(false);
      });
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>ویرایش تدریس خصوصی</CCardHeader>
          <CreateTutoringForm form={form} setForm={setForm} preData={form.poster} />
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
};

export default EditTutoring;
