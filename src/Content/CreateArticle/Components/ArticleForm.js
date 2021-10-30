import React, { useEffect, useState } from "react";
import { CCardBody, CCol, CForm, CRow } from "@coreui/react";
import { GetData } from "src/Service/APIEngine";
import { FormItems } from "./FormItems";
import { SwitchField, TextField } from "src/Utility/InputGroup";
import { CKEditorField } from "src/reusable/CKEditorInput";
import { CoreFileInput } from "src/Utility/CoreFileInput";
import { SelectProvider } from "./SelectProvider";

const ArticleForm = ({ form, setForm, preData }) => {
  const [imageHash, setImageHash] = useState("");
  const [groupIds, setGroupIds] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [providerId, setProviderId] = useState();

  useEffect(() => {
    if (form.writerProviderId) setProviderId(form.writerProviderId);
  }, [form]);

  useEffect(() => {
    if (providerId) setForm({ ...form, writerProviderId: providerId });
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
  useEffect(() => {
    if (imageHash !== form.Image) setForm({ ...form, Image: imageHash });
  }, [imageHash, form]);
  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items.slice(0, 2)}</CRow>
        <CRow>
          {items.slice(2, 4)}{" "}
          <CCol sm={4}>
            <SelectProvider
              providerId={providerId}
              setProviderId={setProviderId}
            />
          </CCol>
        </CRow>
        <CRow>
          {SwitchField(FormItems(form, setForm, groupIds, courseIds)[4])}
          <CoreFileInput
            preData={preData}
            title="آپلود عکس محتوا"
            setHashId={setImageHash}
            type="image/*"
          />
        </CRow>
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

export default ArticleForm;
