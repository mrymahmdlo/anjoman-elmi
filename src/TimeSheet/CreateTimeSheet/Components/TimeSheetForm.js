import React, { useEffect, useState } from "react";
import {
  CCardBody,
  CForm,
  CRow,
  CSelect,
  CFormGroup,
  CLabel,
  CCol,
} from "@coreui/react";
import { APIProviderGet } from "src/Service/APIProvider";
import { FormItemsCreateTimeSheet } from "./FormItems";
import { TextField } from "src/Utility/InputGroup";
import { APICorePost } from "src/Service/APIBase";

const CreateTimeSheetForm = ({ form, setForm }) => {
  const [timeSheetId, setTimeSheetId] = useState();
  const [weekDay, setWeekDay] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (form.timeSheetId) setTimeSheetId(form.timeSheetId);
  }, [form]);

  useEffect(() => {
    setForm({ ...form, timeSheetId: timeSheetId });
  }, [timeSheetId]);

  useEffect(()=> {
    APIProviderGet('TimeSheet/DaysOfWeek').then(res=>setWeekDay(res));
  }, []);

  const items = FormItemsCreateTimeSheet(form, setForm).map((item) =>
    TextField(item)
  );
  useEffect(() => {
    APICorePost("Provider/Tutoring").then((res) => {
      setProviders(res.data)
    });
  }, []);

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items.slice(0, 3)}</CRow>
        <CRow>
          <CCol sm={6}>
            <CFormGroup>
              <label htmlFor="nf-title"> ارائه دهنده : </label>

              <CSelect
                value={form.providerId}
                defaultValue={-1}
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

          <CCol sm={6}>
            <CFormGroup>
              <CLabel htmlFor="nf-title">روز هفته</CLabel>
              <CSelect
                onChange={(e) => {
                  setForm({ ...form, weekDay: e.target.value });
                }}
              >
                <option value={-1}>روز هفته را انتخاب کنید</option>
                {weekDay.map((item, index) => (
                  <option
                    key={index}
                    value={item.id}
                    selected={`${form.weekDay}` === item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </CSelect>
            </CFormGroup>
          </CCol>
        </CRow>
      </CForm>
    </CCardBody>
  );
};

export default CreateTimeSheetForm;
