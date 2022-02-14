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
import { ToastContext } from "src/containers/TheContent";
import EditWebinarForm from "./Components/WebinarForm";
import { ChangeValuesEditWebinar } from "./Components/ChangeValues";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";

const EditWebinar = ({ obj, setModal }) => {
  console.log('obj',obj);
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
  const toast = React.useContext(ToastContext);

  useEffect(() => {
    toast.showToast("تا بارگزاری داده ها کمی صبر کنید");
    setForm(ChangeValuesEditWebinar(obj));
  }, [obj]);
  const submitContent = () => {
    setBtnActive(true);
    let data = form;
    if (form.poster !== "") data["poster"] = form.poster;
    delete data["Image"];
    // todo
    // add serivce
    APIBoardcastPost(`Webinar/Update?webinarId=${obj.webinarId}`, {
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
      providerIds: +form.providerIds.map((item) => item.userId)
        ? form.providerIds.map((item) => item.userId)
        : form.providerIds,
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
          <CCardHeader>ویرایش همایش</CCardHeader>
          <EditWebinarForm form={form} setForm={setForm} preData={form.poster} />
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
    </div>
  );
};

export default EditWebinar;
