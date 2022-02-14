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
import TutoringForm from "./Components/SponsorForm";
import { ChangeValuesSetSponsor } from "./Components/ChangeValues";
import { APIBoardcastGet } from "../../../Service/APIBroadCast";

const SetSponsor = ({ obj, setModal }) => {
  const [form, setForm] = useState({});
  const [btnActice, setBtnActive] = useState(false);
  const [sponsors, setSponsors] = useState([]);
  const toast = React.useContext(ToastContext);

  useEffect(() => {
    // todo
    // add service
    APIBoardcastGet("Admin/GetSponsers").then((res) => {
      setSponsors(res.data);
    });
  }, []);

  useEffect(() => {
    toast.showToast("تا بارگزاری داده ها کمی صبر کنید");
    if (obj) setForm(ChangeValuesSetSponsor(obj));
  }, [obj]);

  const submitContent = () => {
    setBtnActive(true);
    // todo
    // add service
    APIBoardcastPost(`Admin/SetSponser`, {
      tutoringId: +form.tutoringId,
      sponserId: +form.sponserId,
    })
      .then((res) => {
        if (res.data.succeeded === true) {
          toast.showToast("داده با موفقیت ثبت شد ");
          setModal(false);
        } else {
          toast.showToast(res.data.data);
        }
        setBtnActive(false);
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
          <CCardHeader>انتخاب اسپانسر</CCardHeader>
          <TutoringForm form={form} setForm={setForm} sponsors={sponsors} />
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

export default SetSponsor;
