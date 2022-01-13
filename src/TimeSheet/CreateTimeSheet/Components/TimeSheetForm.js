import React, { useEffect, useState } from "react";
import {
  CCardBody,
  CForm,
  CRow,
  CSelect,
  CFormText,
  CFormGroup,
  CLabel,
  CCol,
} from "@coreui/react";
import { GetDataProvider } from "src/Service/APIProvider";
import { FormItems } from "./FormItems";
import { TextField } from "src/Utility/InputGroup";
import { PostData } from "src/Service/APIEngine";

const TimeSheetForm = ({ form, setForm }) => {
  const [timeSheetId, setTimeSheetId] = useState();
  const [weekDay, setWeekDay] = useState([]);
  const [providers, setProviders] = useState([]);
  const [providerId, setProviderId] = useState(-1);

  useEffect(() => {
    if (form.timeSheetId) setTimeSheetId(form.timeSheetId);
  }, [form]);

  useEffect(() => {
    setForm({ ...form, timeSheetId: timeSheetId });
  }, [timeSheetId]);

  useEffect(()=> {
    GetDataProvider('TimeSheet/DaysOfWeek').then(res=>setWeekDay(res));
  }, []);

  const items = FormItems(form, setForm).map((item) =>
    TextField(item)
  );
  useEffect(() => {
       PostData("Provider/Tutoring", {}).then((res) => {
         setProviders(res.data)
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
              <label htmlFor="nf-title"> ارائه دهنده : </label>

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
              <CFormText className="help-block">
                روز هفته را انتخاب کنید
              </CFormText>
            </CFormGroup>
          </CCol>
        </CRow>
      </CForm>
    </CCardBody>
  );
};

export default TimeSheetForm;
