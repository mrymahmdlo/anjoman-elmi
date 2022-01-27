import React, { CSelect, useEffect, useState } from "react";
import { CCardBody, CForm, CRow, CFormGroup, CCol } from "@coreui/react";
import { FormItems } from "./FormItems";
import { TextField } from "src/Utility/InputGroup";
import { PostData } from "src/Service/APIEngine";

const CapacityForm = ({ form, setForm }) => {
  const [timeSheetId, setTimeSheetId] = useState();
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (form.timeSheetId) setTimeSheetId(form.timeSheetId);
  }, [form]);

  useEffect(() => {
    setForm({ ...form, timeSheetId: timeSheetId });
  }, [timeSheetId]);

  const items = FormItems(form, setForm).map((item) => TextField(item));
  useEffect(() => {
    PostData("Provider/Tutoring", {}).then((res) => {
      setProviders(res.data);
    });
  }, []);


  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items.slice(0, 2)}</CRow>
        <CRow>{items.slice(2)}</CRow>
        <CRow>
          <CCol sm={6}>
            <CFormGroup>
              <label htmlFor="nf-title"> پشتیبان ها  : </label>

              <CSelect
                value={form.providerId}
                defaultValue={providerId}
                onChange={(e) => {
                  setForm({ ...form, providerId: e.target.value });
                }}
              >
                <option value={-1}>پشتیبان را انتخاب کنید</option>
                {providers.length > 0 ? (
                  providers.map((item) => (
                    <option value={item.providerId} key={item.providerId}>
                      {item.name + " " + item.lastName}{" "}
                    </option>
                  ))
                ) : (
                  <option>پشتیبانی وجود ندارد</option>
                )}
              </CSelect>
            </CFormGroup>
          </CCol>
        </CRow>
      </CForm>
    </CCardBody>
  );
};

export default CapacityForm;
