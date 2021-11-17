import React, { useEffect, useState } from "react";
import { CCardBody, CForm, CRow } from "@coreui/react";
import { GetData } from "src/Service/APIEngine";
import { FormItems } from "./FormItems";
import {TextField } from "src/Utility/InputGroup";
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
    if (imageHash !== form.poster) setForm({ ...form, poster: imageHash });
  }, [imageHash, form]);
  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items.slice(0, 3)}</CRow>
        <CRow>{items.slice(3, 5)}</CRow>
        <CRow>{items.slice(5, 7)}</CRow>
        <CRow>
          <CoreFileInput
            preData={preData}
            title="آپلود عکس همایش"
            setHashId={setImageHash}
            type="image/*"
          />
        </CRow>
      </CForm>
    </CCardBody>
  );
};

export default WebinarForm;
