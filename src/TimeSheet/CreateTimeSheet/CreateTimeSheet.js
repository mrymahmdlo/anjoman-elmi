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
import { APIProviderPost } from "src/Service/APIProvider";
import { ToastContext } from "src/containers/TheContent";
import CreateTimeSheetForm from "./Components/TimeSheetForm";
import { useHistory } from "react-router";

const CreateTimeSheet = () => {
  const [form, setForm] = useState({});
  const [btnActive, setBtnActive] = useState(false);
  const history = useHistory();
  const toast = React.useContext(ToastContext);

  const submitTimeSheet = () => {
    setBtnActive(true);
    // todo
    // add service
    APIProviderPost("TimeSheet/AddTimeSheet", {
      providerId: Number(form.providerId),
      // productId: 0,
      startPeriodHour: Number(form.startPeriodHour),
      endPeriodHour: Number(form.endPeriodHour),
      rechargeCapacityAmountHour: Number(form.rechargeCapacityAmountHour),
      weekDay: Number(form.weekDay),
    })
      .then((res) => {
        if (res.success === true) {
          toast.showToast("داده با موفقیت ثبت شد ");
        history.push("/TimeSheet/ManageTimeSheet");
        } else {
          toast.showToast(res.message);
        }
        setBtnActive(false);
      })
      .catch(() => {
        toast.showToast("ثبت داده ها با مشکل مواجه شد");
        setBtnActive(false);
      });
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>ساخت زمان بندی</CCardHeader>
          <CreateTimeSheetForm form={form} setForm={setForm} />
          <CCardFooter>
            {!btnActive ? (
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={submitTimeSheet}
              >
                <CIcon name="cil-scrubber" /> ثبت زمان بندی
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

export default CreateTimeSheet;
