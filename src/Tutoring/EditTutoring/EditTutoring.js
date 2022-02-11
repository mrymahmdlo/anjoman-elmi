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
import CreateTutoringForm from "src/Tutoring/CreateTutoring/Components/TuturingForm";
import { ChangeValuesEditTutoring } from "./Components/ChangeValues";

const EditTutoring = ({ obj, setModal }) => {
  const [form, setForm] = useState({});
  const [btnActice, setBtnActive] = useState(false);
  const toast = React.useContext(ToastContext);

  useEffect(() => {
    toast.showToast("تا بارگزاری داده ها کمی صبر کنید");
    setForm(ChangeValuesEditTutoring(obj));
  }, [obj]);

  const submitContent = () => {
    setBtnActive(true);
    APIBoardcastPost(`Tutorial/Update?tutorialId=${obj.tutorialId}`, {
      groupId: +form.groupId,
      courseId: +form.courseId,
      totalMinute: +form.totalMinute,
      title: form.title,
      description: "",
      minProviderRank: +form.minProviderRank,
      maxProviderRank: +form.maxProviderRank,
      // todo
      // where is isOffline?
      price: 0,
    })
      .then(() => {
        toast.showToast("داده با موفقیت ثبت شد ");
        setBtnActive(false);
        setModal(false);
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
          <CCardHeader>ویرایش تدریس خصوصی</CCardHeader>
          <CreateTutoringForm
            form={form}
            setForm={setForm}
            preData={form.poster}
          />
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
    </div>
  );
};

export default EditTutoring;
