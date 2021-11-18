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
import { useParams } from "react-router";
import { ChangeValues } from "./Components/ChangeValues";

const EditWebinar = ({obj}) => {
  const { id } = useParams();
  const [form, setForm] = useState({
    priceAfterHolding: 0,
    schedules: [
      {
        startDateTime: "2021-11-17T18:15:28.493Z",
        endDateTime: "2021-11-17T18:15:28.493Z",
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
    fetch(`http://dev.bamis.ir/api/v1/Product/Webinar/35`, {
      method: "GET",
    }) .then(response => response.json())
        // .then(res => {console.log(res);setForm(ChangeValues(res.data))})
      .finally(() => {
        setShowError(false);
      });
  }, [id]);

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    let data = form;
    if (form.poster !== "") data["image"] = form.poster;
    delete data["Image"];
    PostData(`Webinar/Update?webinarId=${id}`, data)
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
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
