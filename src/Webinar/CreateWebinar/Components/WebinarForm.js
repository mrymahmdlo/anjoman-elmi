import React, { useEffect, useState } from "react";
import { CCardBody, CForm, CRow } from "@coreui/react";
import { GetData } from "src/Service/APIEngine";
import { FormItems } from "./FormItems";
import { SwitchField, TextField } from "src/Utility/InputGroup";
import { CKEditorField } from "src/reusable/CKEditorInput";
import { CoreFileInput } from "src/Utility/CoreFileInput";

const WebinarForm = ({ form, setForm, preData }) => {
  const [imageHash, setImageHash] = useState("");
  const [groupIds, setGroupIds] = useState([]);
  const [courseIds, setCourseIds] = useState([]);

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
        <CRow>{items.slice(2, 4)}</CRow>
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

export default WebinarForm;
