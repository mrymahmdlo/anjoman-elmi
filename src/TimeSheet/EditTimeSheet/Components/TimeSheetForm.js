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

const TimeSheetForm = ({ form, setForm }) => {
  const [timeSheetId, setTimeSheetId] = useState();
  const [weekDay, setWeekDay] = useState([]);

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

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items.slice(0, 2)}</CRow>
        

        <CRow>
          <CCol sm={6}>
            <CFormGroup>
              <CLabel htmlFor="nf-title">روز هفته</CLabel>
              <CSelect
                onChange={(e) => {
                  setForm({ ...form, weekDay: e.target.value });
                }}
              >
                {weekDay.map((item, index) => (
                    <option
                      key={index}
                      value={item.id}
                      selected={`${form.weekDay}` === item.name}
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
          <CCol sm={6} style={{ padding: 0}}>{items[2]}</CCol>
        </CRow>
      </CForm>
    </CCardBody>
  );
};

export default TimeSheetForm;
