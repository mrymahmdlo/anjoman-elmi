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
import ProviderCourseForm from "./ProviderCourseForm";
import { useHistory } from "react-router";
// todo
// change format to js

const CreateProviderCourse = () => {
  const [form, setForm] = useState({});
  const [btnActice, setBtnActive] = useState(false);
  const history = useHistory();
  const toast = React.useContext(ToastContext);

  const submitContent = () => {
    setBtnActive(true);
   delete form["groupId"];
   // todo
   // add service
   APIBoardcastPost("ProviderCourse/CreateProviderCourse", form)
      .then(() => {
        toast.showToast("داده با موفقیت ثبت شد ");
        // todo
        // add service
        history.push("/ProviderCourse/ProviderCourse");
        setBtnActive(false);
      })
      .catch(() => {
        toast.showToast("خطا در ثبت محتوا");
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
    </div>
  );
};

export default CreateProviderCourse;
