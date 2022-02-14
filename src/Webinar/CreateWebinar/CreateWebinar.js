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
import CreateWebinarForm from "./Components/WebinarForm";
import { useHistory } from "react-router";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";

const CreateWebinar = () => {
  const [form, setForm] = useState({
    schedules: [
      {
        startDateTime: "",
        endDateTime: "",
        subject: "",
      },
    ],
    providerIds: [],
  });
  const [btnActice, setBtnActive] = useState(false);
  const history = useHistory();
  const toast = React.useContext(ToastContext);
 
  const submitContent = () => {
    setBtnActive(true);
    // todo
    // add service
    // check validation 
    APIBoardcastPost("Webinar/Create", {
      ...form,
      title: form.title,
      duration: +form.duration,
      capacity: +form.capacity,
      groupId: +form.groupId,
      courseId: +form.courseId,
      countOfSession: +form.countOfSession,
      priceAfterHolding: +form.priceAfterHolding,
      schedules: [
        {
          startDateTime: HejriToDotNetGeorgian(form.schedules[0].startDateTime),
          endDateTime: HejriToDotNetGeorgian(form.schedules[0].endDateTime),
          subject: "",
        },
      ],
    })
      .then(() => {
        toast.showToast("داده با موفقیت ثبت شد ");
        history.push("/Webinar/ManageWebinars");
        setBtnActive(false);
      })
      .catch((res) => {
        toast.showToast(res.data?res.data:"لطفا فیلد های ضروری را پر کنید");
        setBtnActive(false);
      });
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>ساخت همایش</CCardHeader>
          <CreateWebinarForm form={form} setForm={setForm} />
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
