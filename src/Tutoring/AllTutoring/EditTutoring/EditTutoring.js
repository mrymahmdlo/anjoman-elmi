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
import TutoringForm from "./Components/TutoringForm";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";
import { PostData } from "../../../Service/APIEngine";
import { ChangeValues } from "./Components/ChangeValues";
import { GetDataBroad } from "../../../Service/APIBroadCast";

const EditTutoring = ({ obj, setModal, tutoringId }) => {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);
  const [providers, setProviders] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [sponsers, setSponsers] = useState([]);

  useEffect(() => {
    PostData("Provider/Tutoring", {}).then((res) => {
      setProviders(res.data);
    });
  }, []);

  useEffect(() => {
    GetDataBroad("Tutorial/GetAll", {}).then((res) => {
      setTutorials(res.data);
    });
  }, []);

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
    PostDataBroad(`Admin/EditTutoring/${tutoringId}`, {
      providerId: +form.providerId,
      tutorialId: +form.tutorialId,
      startDateRange: HejriToDotNetGeorgian(form.startDateRange),
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

      PostDataBroad(`Admin/SetSponser`, {
        userId: +form.userId,
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
          <CCardHeader>ویرایش جلسه</CCardHeader>
          <TutoringForm form={form} setForm={setForm} providers={providers} tutorials={tutorials} sponsers={sponsers} />
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

export default EditTutoring;
