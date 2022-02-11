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
import { APIBoardcastPost } from "src/Service/APIBroadCast";
import { ToastContext } from "src/containers/TheContent";
import CreateTutoringForm from "./Components/TuturingForm";
import { useHistory } from "react-router";

// todo
// to format js not jsx
const CreateWebinar = () => {
  const [form, setForm] = useState({});
  const [btnActice, setBtnActive] = useState(false);
  const history = useHistory();
  const toast = React.useContext(ToastContext);
  const submitContent = () => {
    setBtnActive(true);
    // todo
    // add service
    APIBoardcastPost("Tutorial/Create", {
      groupId: +form.groupId,
      courseId: +form.courseId,
      totalMinute: +form.totalMinute,
      title: form.title,
      description: "",
      minProviderRank: +form.minProviderRank,
      maxProviderRank: +form.maxProviderRank,
      price: +form.price,
      isOffline: form.isOffline !== 0,
    })
      .then(() => {
        toast.showToast("داده با موفقیت ثبت شد ");
        history.push("/Tutoring/ManageTutoring");
        setBtnActive(false);
      })
      .catch(() => {
        toast.showToast("لطفا فیلد های ضروری را پر کنید");
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
    </div>
  );
};

export default CreateWebinar;
