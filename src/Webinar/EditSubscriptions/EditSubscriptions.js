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
import SubscriptionsForm from "./Components/SubscriptionsForm";
import { ChangeValues } from "./Components/ChangeValues";

const EditSubscriptions = ({ obj, setModal }) => {
  console.log(obj);
  const [form, setForm] = useState({
    buyDateTime: "",
    joinDatetime: "",
    cancelDatetime: "",
  });
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);

  useEffect(() => {
    setErrorContent("تا بارگزاری داده ها کمی صبر کنید");
    setShowError(true);
    setForm(ChangeValues(obj));
  }, [obj]);

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    // let data = form;
    // if (form.webinarLink !== "") data["webinarLink"] = form.webinarLink;
    PostDataBroad(
      `/webinar/UpdateSubscription?subscriptionId=${obj.subscriptionId}`,
      {
        ...form,
        webinarLink: form.webinarLink,
        buyDateTime: +form.buyDateTime,
        joinDatetime: +form.joinDatetime,
        cancelDatetime: +form.cancelDatetime,
      }
    )
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
        setShowError(true);
        setBtnActive(false);
        setModal(false);
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
          <CCardHeader>ویرایش سفارشات همایش</CCardHeader>
          <SubscriptionsForm form={form} setForm={setForm} />
          <CCardFooter>
            {!btnActice ? (
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={submitContent}
              >
                <CIcon name="cil-scrubber" /> ثبت سفارشات همایش
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

export default EditSubscriptions;
