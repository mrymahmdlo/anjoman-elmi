import React, { Fragment, useEffect, useState } from "react";
import { CCardBody, CForm, CRow, CFormGroup, CCol } from "@coreui/react";
import { FormItems } from "./FormItems";
import { TextField } from "src/Utility/InputGroup";
import { PostData } from "src/Service/APIEngine";
import Select from "react-select";

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

  const providersArray = providers.map((item) => ({
    value: +item.providerId,
    label: `${item.name} ${item.lastName}`,
  }));
  console.log(providersArray);

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items.slice(0, 2)}</CRow>
        <CRow>{items.slice(2)}</CRow>
        <CRow>
          <CCol sm={6}>
            <CFormGroup>
              <label htmlFor="nf-title"> پشتیبان ها  : </label>

              <Fragment>
                <Select
                  options={providersArray}
                  onChange={(e) => {
                    setForm({ ...form, providerId: e.value });
                  }}
                />
              </Fragment>
            </CFormGroup>
          </CCol>
        </CRow>
      </CForm>
    </CCardBody>
  );
};

export default CapacityForm;
