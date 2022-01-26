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
import TutoringForm from "./Components/SponserForm";
import { ChangeValues } from "./Components/ChangeValues";
import { GetDataBroad } from "../../../Service/APIBroadCast";

const SetSponser = ({ obj, setModal, tutoringId }) => {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);
  const [sponsers, setSponsers] = useState([]);

  useEffect(() => {
    GetDataBroad("Admin/GetSponsers", {}).then((res) => {
      setSponsers(res.data);
    });
  }, []);

  useEffect(() => {
    setErrorContent("تا بارگزاری داده ها کمی صبر کنید");
    setShowError(true);
    if (obj) setForm(ChangeValues(obj));
  }, [obj]);

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
      PostDataBroad(`Admin/SetSponser`, {
        tutoringId: +form.tutorialId,
        sponserId: +form.sponserId,
      })
        .then((res) => {
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
          setErrorContent("خطا در ثبت ویرایش");
          setShowError(true);
          setBtnActive(false);
        });
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>انتخاب اسپانسر</CCardHeader>
          <TutoringForm form={form} setForm={setForm} sponsers={sponsers} />
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

export default SetSponser;
