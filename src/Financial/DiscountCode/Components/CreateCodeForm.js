import { freeSet } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCardFooter,
  CCol,
  CForm,
  CInput,
  CLabel,
  CRow,
  CSpinner,
} from "@coreui/react";
import React, { useState } from "react";
import { APICorePost } from "src/Service/APIBase";
import { copyToClipboard } from "src/Utility/CopyToClipboard";
import { TextField } from "src/Utility/InputGroup";
import { ToastContext } from "src/containers/TheContent";
import CreateCodeItems from "./CreateCodeItems";
import { SelectCategories } from "./SelectSubcategories";

const CreateCodeForm = () => {
  const [btnActice, setBtnActive] = useState(false);
  const [form, setForm] = useState({
    isPercent: "true",
    amount: null,
    totalUseableCount: null,
    subCategories: [],
  });
  const toast = React.useContext(ToastContext);
  const [response, setResponse] = useState();

  const items = CreateCodeItems(form, setForm).map((item) => TextField(item));
  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnActive(true);
    if (form.amount < 0 || form.totalUseableCount < 0) {
      toast.showToast("لطفا فیلد های ضروری را درست پر کنید");
      setBtnActive(false);
    } else if (form.subCategories.length <= 0) {
      toast.showToast("لطفا  محصول را انتخاب کنید");
      setBtnActive(false);
    } else {
      APICorePost("Order/Discount/Create", {
        ...form,
        isPercent: form.isPercent === "true" ? true : false,
        amount: +form.amount,
        totalUseableCount: +form.totalUseableCount,
      })
        .then((res) => setResponse(res.data))
        .catch((err) => {
          toast.showToast("لطفا فیلد های ضروری را درست پر کنید");
        })
        .finally(() => setBtnActive(false));
    }
  };
  return (
    <>
      <CForm>
        <CRow>{items.slice(0, 2)}</CRow>
        <CRow>
          <CCol>
            <SelectCategories form={form} setForm={setForm} />
          </CCol>
          <CCol>{form.isPercent === "true" ? items[2] : items[3]}</CCol>
        </CRow>
        {response ? (
          <CCardFooter>
            <CRow>
              <CCol>
                <CLabel>کد تخفیف ساخته شد</CLabel>
              </CCol>
              <CCol>
                <CInput value={response} />
              </CCol>
              <CCol>
                <CButton
                  color="primary"
                  onClick={() => copyToClipboard(response)}
                >
                  <CIcon content={freeSet.cilCopy} title="کپی لینک" />
                </CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        ) : null}
        <CCardFooter>
          {!btnActice ? (
            <CButton
              type="submit"
              size="sm"
              color="primary"
              onClick={handleSubmit}
            >
              <CIcon name="cil-scrubber" /> ثبت اطلاعات
            </CButton>
          ) : (
            <CSpinner
              style={{ width: "2rem", height: "2rem" }}
              color="info"
              variant="grow"
            />
          )}
        </CCardFooter>
      </CForm>
    </>
  );
};

export default CreateCodeForm;
