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
import { APIBoardcastPost } from "src/Service/APIBroadCast";
import { Toast } from "src/Utility/Toast";
import TutoringForm from "./Components/SponsorForm";
import { ChangeValuesSetSponsor } from "./Components/ChangeValues";
import { APIBoardcastGet } from "../../../Service/APIBroadCast";

const SetSponsor = ({ obj, setModal }) => {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    APIBoardcastGet("Admin/GetSponsers").then((res) => {
      setSponsors(res.data);
    });
  }, []);

  useEffect(() => {
    setErrorContent("تا بارگزاری داده ها کمی صبر کنید");
    setShowError(true);
    if (obj) setForm(ChangeValuesSetSponsor(obj));
  }, [obj]);

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    APIBoardcastPost(`Admin/SetSponser`, {
      tutoringId: +form.tutoringId,
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
          <TutoringForm form={form} setForm={setForm} sponsors={sponsors} />
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

export default SetSponsor;
