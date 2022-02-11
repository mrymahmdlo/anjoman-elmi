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
import { ToastContext } from "src/containers/TheContent";
import EditAllTutoringForm from "./Components/TutoringForm";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";
import { APICorePost } from "../../../Service/APIBase";
import { ChangeValuesEditAllTutoring } from "./Components/ChangeValues";
import { APIBoardcastGet } from "../../../Service/APIBroadCast";

const EditAllTutoring = ({ obj, setModal, tutoringId }) => {
  const [form, setForm] = useState({});
  const [btnActice, setBtnActive] = useState(false);
  const [providers, setProviders] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const toast = React.useContext(ToastContext);

  useEffect(() => {
    // todo
    // add service
    APICorePost("Provider/Tutoring").then((res) => {
      setProviders(res.data);
    });
  }, []);

  useEffect(() => {
    // todo
    // add service
    APIBoardcastGet("Tutorial/GetAll", {}).then((res) => {
      setTutorials(res.data);
    });
  }, []);

  useEffect(() => {
    toast.showToast("تا بارگزاری داده ها کمی صبر کنید");
    if (obj) setForm(ChangeValuesEditAllTutoring(obj));
  }, [obj]);

  const submitContent = () => {
    setBtnActive(true);
    // todo
    // add service
    APIBoardcastPost(`Admin/EditTutoring/${tutoringId}`, {
      providerId: +form.providerId,
      tutorialId: +form.tutorialId,
      startDateRange: HejriToDotNetGeorgian(form.startDateRange),
    })
      .then((res) => {
        if (res.data.succeeded === true) {
          toast.showToast("داده با موفقیت ثبت شد ");
          setModal(false);
        } else {
          toast.showToast(res.data.data);
        }
        setBtnActive(false);
      })
      .catch(() => {
        toast.showToast("خطا در ثبت ویرایش");
        setBtnActive(false);
      });
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>ویرایش جلسه</CCardHeader>
          <EditAllTutoringForm form={form} setForm={setForm} providers={providers} tutorials={tutorials} />
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
    </div>
  );
};

export default EditAllTutoring;
