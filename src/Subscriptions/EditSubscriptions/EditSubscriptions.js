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
import SubscriptionsForm from "./Components/SubscriptionsForm";
import { ChangeValuesEditSubscriptions } from "./Components/ChangeValues";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";

const EditSubscriptions = ({ obj, setModal }) => {
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
    setForm(ChangeValuesEditSubscriptions(obj));
  }, [obj]);
  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    // todo
    // transfer all subscriotion folder to Tutoring  => it is subdomain
    //todo
    // add service
    APIBoardcastPost(
      `webinar/UpdateSubscription?subscriptionId=${obj.subscriptionId}`,
      {
        //todo
        // remove ?
        userId: obj?.userId,
        webinarId: obj?.webinar.webinarId,
        token: obj?.token,
        webinarLink: form.webinarLink,
        buyDateTime:
          form.buyDateTime !== null
            ? HejriToDotNetGeorgian(form.buyDateTime)
            : null,
        joinDatetime:
          form.joinDatetime !== null
            ? HejriToDotNetGeorgian(form.joinDatetime)
            : null,
        cancelDatetime:
          form.cancelDatetime !== null
            ? HejriToDotNetGeorgian(form.cancelDatetime)
            : null,
      }
    )
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
        setModal(false);
        setShowError(true);
      })
      .catch(() => {
        setErrorContent("خطا در ثبت ویرایش");
      })
      .finally(() => {
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
