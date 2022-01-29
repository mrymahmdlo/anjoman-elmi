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
import {  PostDataProvider } from "src/Service/APIProvider";
import { Toast } from "src/Utility/Toast";
import TimeSheetForm from './Components/TimeSheetForm';
import { useHistory } from "react-router";


const EditTimeSheet = ({ obj, setModal }) => {
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setErrorContent("تا بارگزاری داده ها کمی صبر کنید");
    setShowError(true);
    setForm(obj);
    console.log(obj);
  }, [obj]);
const ChangeValues = (day) => {

  switch (day) {
    case "یکشنبه":
      return 0;
    case "دوشنبه":
       return 1;
    case "سه شنبه":
       return 2;
    case "چهارشنبه":
      return 3;
    case "پنج شنبه":
       return 4;
    case "جمعه":
       return 5;
    case "شنبه":
      return 6;


  }
};
  const submitTimeSheet = () => {
    setShowError(false);
    setBtnActive(true);
    console.log(ChangeValues(obj.weekDay));


    console.log(form.weekDay);
    PostDataProvider("TimeSheet/EditTimeSheet", {
      timeSheetId: obj.timeSheetId,
      providerId: obj.providerId,
      // productId: obj.productId,
      startPeriodHour: Number(form.startPeriodHour),
      endPeriodHour: Number(form.endPeriodHour),
      rechargeCapacityAmountHour: Number(form.rechargeCapacityAmount),
      capacityMinutesour: Number(form.capacityMinutes),
      weekDay:
        form.weekDay !== obj.weekDay
          ? Number(form.weekDay)
          : ChangeValues(obj.weekDay),
    })
      .then((res) => {
        if (res.success === true) {
          setErrorContent("داده با موفقیت ثبت شد ");
          history.push("/TimeSheet/ManageTimeSheet");
          setModal(false);
        } else {
          setErrorContent(res.message);
        }
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
          <CCardHeader>ویرایش زمان بندی</CCardHeader>
          <TimeSheetForm form={form} setForm={setForm} />
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

export default EditTimeSheet;
