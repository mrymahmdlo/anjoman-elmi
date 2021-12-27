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
import { GetData } from "src/Service/APIEngine";
import { FormItems } from "./FormItems";
import { TextField } from "src/Utility/InputGroup";

const TuturingForm = ({ form, setForm, preData }) => {
  const [groupIds, setGroupIds] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [providerId, setProviderId] = useState();
  const [providerRank, setProviderRank] = useState();

  useEffect(() => {
    if (form.providerId) setProviderId(form.providerId);
  }, [form]);
  useEffect(() => {
    if (providerRank) {
      switch (providerRank) {
        case "1 تا 50":
          setForm({ ...form, minProviderRank: 0, maxProviderRank: 50 });

        case "51 تا 500":
          setForm({ ...form, minProviderRank: 50, maxProviderRank: 500 });
        case "500 به بالا":
          setForm({ ...form, minProviderRank: 500, maxProviderRank: 500000 });
      }
    }
  }, [providerRank,form]);

  useEffect(() => {
    setForm({ ...form, providerId: providerId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerId]);
  useEffect(() => {
    GetData("BasicInfo/Groups").then((res) => setGroupIds(res));
  }, []);

  useEffect(() => {
    if (form.groupId && form.groupId !== "")
      GetData("BasicInfo/CoursesByGroupId?groupId=" + form.groupId).then(
        (res) => setCourseIds(res)
      );
    else {
      setCourseIds([]);
    }
  }, [form.groupId]);

  const items = FormItems(form, setForm, groupIds, courseIds).map((item) =>
    TextField(item)
  );

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items.slice(0, 2)}</CRow>
        <CRow>{items.slice(2)}</CRow>

        <CFormGroup>
          <CLabel htmlFor="nf-title">زمان جلسه</CLabel>
          <CSelect
            onChange={(e) => {
              setForm({ ...form, totalMinute: e.target.value });
            }}
          >
            {[{ id: "30" }, { id: "60" }, { id: "90" }].map((item, index) => (
              <option
                key={index}
                value={item.id}
                selected={`${form.totalMinute}` === item.id}
              >
                {item.id}دقیقه ای
              </option>
            ))}
          </CSelect>
          <CFormText className="help-block">زمان را انتخاب کنید</CFormText>
        </CFormGroup>

        <CFormGroup>
          <CLabel htmlFor="nf-title">رتبه </CLabel>
          <CSelect
            onChange={(e) => {
              console.log("1", e.target.value);
              setProviderRank(e.target.value);
            }}
          >
            {[
              { id:"0",name: "1 تا 50" },
              { id:'50',name: "51 تا 500" },
              { id:'500',name: "500 به بالا" },
            ].map((item, index) => (
              <option
                key={index}
                value={item.name}
                selected={`${form.minProviderRank}` == item.name}
              >
                {item.name}
              </option>
            ))}
          </CSelect>
          <CFormText className="help-block">رتبه را انتخاب کنید</CFormText>
        </CFormGroup>

        {/* <CKEditorField
          name="متن محتوا"
          text="لطفا متن محتوای خود را وارد کنید"
          fieldName="description"
          form={form}
          setForm={setForm}
        /> */}
      </CForm>
    </CCardBody>
  );
};

export default TuturingForm;
