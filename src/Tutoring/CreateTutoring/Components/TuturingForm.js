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
import {TextField } from "src/Utility/InputGroup";
import { CoreFileInput } from "src/Utility/CoreFileInput";
import { CKEditorField } from "src/reusable/CKEditorInput";
import { SelectProvider } from "../../../Content/CreateArticle/Components/SelectProvider";
const TuturingForm = ({ form, setForm, preData }) => {
  const [imageHash, setImageHash] = useState("");
  const [groupIds, setGroupIds] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [providerId, setProviderId] = useState();

  useEffect(() => {
    if (form.providerId) setProviderId(form.providerId);
  }, [form]);

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
  // useEffect(() => {
  //   if (imageHash !== form.poster) setForm({ ...form, poster: imageHash });
  // }, [imageHash, form]);
  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items.slice(0, 2)}</CRow>
        <CRow>{items.slice(2)}</CRow>
        <CCol sm="3">
          <CFormGroup>
            <CLabel htmlFor="nf-title">زمان جلسه</CLabel>
            <CSelect
              onChange={(e) => {
                console.log("1", e.target.value);
                setForm({ ...form, quizType: e.target.value });
              }}
            >
              {[
                { id: "30", name: "30 دقیقه ای" },
                { id: "60", name: "60 دقیقه ای" },
                { id: "90", name: "90 دقیقه ای" },
              ].map((item, index) => (
                <option
                  key={index}
                  value={item.id}
                  selected={`${form.quizType}` === item.id}
                >
                  {item.name}
                </option>
              ))}
            </CSelect>
            <CFormText className="help-block">زمان را انتخاب کنید</CFormText>
          </CFormGroup>
        </CCol>
        <CCol sm="3">
          <CFormGroup>
            <CLabel htmlFor="nf-title">زمان جلسه</CLabel>
            <CSelect
              onChange={(e) => {
                console.log("1", e.target.value);
                setForm({ ...form, minProviderRank: e.target.value });
              }}
            >
              {[
                { id: "30" },
                { id: "60" },
                { id: "90" },
              ].map((item, index) => (
                <option
                  key={index}
                  value={item.id}
                  selected={`${form.minProviderRank}` === item.id}
                >
                  {item.id}
                </option>
              ))}
            </CSelect>
            <CFormText className="help-block">زمان را انتخاب کنید</CFormText>
          </CFormGroup>
        </CCol>
        <CCol sm="3">
          <CFormGroup>
            <CLabel htmlFor="nf-title">زمان جلسه</CLabel>
            <CSelect
              onChange={(e) => {
                console.log("1", e.target.value);
                setForm({ ...form, maxProviderRank: e.target.value });
              }}
            >
              {[
                { id: "30"},
                { id: "60" },
                { id: "90" },
              ].map((item, index) => (
                <option
                  key={index}
                  value={item.id}
                  selected={`${form.maxProviderRank}` === item.id}
                >
                  {item.id}
                </option>
              ))}
            </CSelect>
            <CFormText className="help-block">زمان را انتخاب کنید</CFormText>
          </CFormGroup>
        </CCol>
        {/* <CRow>{items.slice(5, 7)}</CRow>
        <CRow>{items.slice(7, 9)}</CRow> */}
        {/* <CRow>
          {" "}
          <SelectProvider
            providerId={providerId}
            setProviderId={setProviderId}
          />
        </CRow> */}
        {/* <CRow>
          <CoreFileInput
            preData={preData}
            title="آپلود عکس همایش"
            setHashId={setImageHash}
            type="image/*"
          />
        </CRow>*/}
        <CKEditorField
          name="متن محتوا"
          text="لطفا متن محتوای خود را وارد کنید"
          fieldName="description"
          form={form}
          setForm={setForm}
        />
      </CForm>
    </CCardBody>
  );
};

export default TuturingForm;
