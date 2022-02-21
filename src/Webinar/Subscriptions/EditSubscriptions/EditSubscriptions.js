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
import SubscriptionsForm from "./Components/SubscriptionsForm";
import { ChangeValuesEditSubscriptions } from "./Components/ChangeValues";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";

const EditSubscriptions = ({ obj, setModal }) => {
  const [form, setForm] = useState({
    buyDateTime: "",
    joinDateTime: "",
    cancelDateTime: "",
  });
  const [btnActice, setBtnActive] = useState(false);
  const toast = React.useContext(ToastContext);
  useEffect(() => {
    toast.showToast("تا بارگزاری داده ها کمی صبر کنید");
    setForm(ChangeValuesEditSubscriptions(obj));
  }, [obj]);
  const submitContent = () => {
    setBtnActive(true);
   
    APIBoardcastPost(`webinar/UpdateSubscription?subscriptionId=${obj.subscriptionId}`,{
       
        userId: obj.userId,
        webinarId: obj.webinar.webinarId,
        token: obj.token,
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
        toast.showToast("داده با موفقیت ثبت شد ");
        setBtnActive(false);
        setModal(false);
      })
      .catch(() => {
        toast.showToast("خطا در ثبت ویرایش");
         setBtnActive(false);
      })
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
    </div>
  );
};

export default EditSubscriptions;
