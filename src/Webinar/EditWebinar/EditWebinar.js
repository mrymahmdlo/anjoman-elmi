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
import { GetData, PostData } from "src/Service/APIWebinar";
import { Toast } from "src/Utility/Toast";
import WebinarForm from "src/Webinar/CreateWebinar/Components/WebinarForm";
import { ChangeValues } from "./Components/ChangeValues";
import { TokenManager } from "src/Identity/Service/TokenManager";

const EditWebinar = ({ obj, setModal }) => {
  const { GetUserId } = TokenManager();
  const [form, setForm] = useState({
    providerId: GetUserId(),
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

  useEffect(() => {
    setErrorContent("تا بارگزاری داده ها کمی صبر کنید");
    setShowError(true);
    setForm(ChangeValues(obj));
  }, [obj]);

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    let data = form;
    if (form.poster !== "") data["poster"] = form.poster;
    delete data["Image"];
    PostData(`Webinar/Update?webinarId=${obj.webinarId}`, {
      ...form,
      title: form.title,
      duration: +form.duration,
      capacity: +form.capacity,
      groupId: +form.groupId,
      courseId: +form.courseId,
      countOfSession: +form.countOfSession,
      priceAfterHolding: +form.priceAfterHolding,
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
          <CCardHeader>ویرایش همایش</CCardHeader>
          <WebinarForm form={form} setForm={setForm} preData={form.poster} />
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

export default EditWebinar;
