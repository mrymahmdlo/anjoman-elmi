import React, { useEffect, useState } from "react";
import {
  CCardBody,
  CForm,
  CRow,
  CFormGroup,
  CCol,
  CSelect,
} from "@coreui/react";
import { FormItemsCapacityRegistration } from "./FormItems";
import { TextField } from "src/Utility/InputGroup";
import { PostData } from "src/Service/APIEngine";

const CapacityForm = ({ form, setForm }) => {
  const [providers, setProviders] = useState([]);
  const [providerId, setProviderId] = useState(-1);

  const items = FormItemsCapacityRegistration(form, setForm).map((item) => TextField(item));
  useEffect(() => {
    PostData("Provider/Tutoring", {}).then((res) => {
      setProviders(res.data);
    });
  }, []);

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>
          <CCol sm={6}>
            <CFormGroup>
              <label htmlFor="nf-title"> پشتیبان ها : </label>

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
          <CCol sm={6}>{items}</CCol>
        </CRow>
      </CForm>
    </CCardBody>
  );
};

export default CapacityForm;
