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
import { FormItemsCreateTutoring } from "./FormItems";
import { TextField } from "src/Utility/InputGroup";

const CreateTutoringForm = ({ form, setForm, preData }) => {
  const [groupIds, setGroupIds] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [providerId, setProviderId] = useState();
  const [providerRank, setProviderRank] = useState();

  useEffect(() => {
    if (form.providerId) setProviderId(form.providerId);
  }, [form]);
  // useEffect(() => {

  //     switch (providerRank) {
  //       case "1 تا 50":
  //         setForm({ ...form, minProviderRank: 0, maxProviderRank: 50 });
  //       case "51 تا 500":
  //         setForm({ ...form, minProviderRank: 50, maxProviderRank: 500 });
  //       case "500 به بالا":
  //         setForm({ ...form, minProviderRank: 500, maxProviderRank: 500000 });
  //     }

  // }, [providerRank,form]);

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

  const items = FormItemsCreateTutoring(form, setForm, groupIds, courseIds).map((item) =>
    TextField(item)
  );

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items.slice(0, 2)}</CRow>
        <CRow>{items.slice(2)}</CRow>
        <CRow>
          <CCol sm={6}>
            <CFormGroup >
              <CLabel htmlFor="nf-title">زمان جلسه</CLabel>
              <CSelect
                onChange={(e) => {
                  setForm({ ...form, totalMinute: e.target.value });
                }}
              >
                <option value={-1}>زمان را انتخاب کنید</option>
                {[{ id: "30" }, { id: "60" }, { id: "90" }].map(
                  (item, index) => (
                    <option
                      key={index}
                      value={item.id}
                      selected={`${form.totalMinute}` === item.id}
                    >
                      {item.id}دقیقه ای
                    </option>
                  )
                )}
              </CSelect>
            </CFormGroup>
          </CCol>
          <CCol sm={6}>
            <CFormGroup >
              <CLabel htmlFor="nf-title">رتبه </CLabel>
              <CSelect
                onChange={(e) => {
                  console.log(e.target.value);
                  if (e.target.value == 0) {
                    setForm({
                      ...form,
                      minProviderRank: 0,
                      maxProviderRank: 50,
                    });
                  } else if (e.target.value == 50) {
                    setForm({
                      ...form,
                      minProviderRank: 50,
                      maxProviderRank: 500,
                    });
                  } else if (e.target.value == 500) {
                    setForm({
                      ...form,
                      minProviderRank: 500,
                      maxProviderRank: 500000,
                    });
                  }
                }}
              >
                <option value={-1}>رتبه را انتخاب کنید</option>
                {[
                  { id: 0, name: "1 تا 50" },
                  { id: 50, name: "51 تا 500" },
                  { id: 500, name: "500 به بالا" },
                ].map((item, index) => (
                  <option
                    key={index}
                    value={item.id}
                    selected={`${form.minProviderRank}` == item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </CSelect>
            </CFormGroup>
          </CCol>
        </CRow>
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

export default CreateTutoringForm;
