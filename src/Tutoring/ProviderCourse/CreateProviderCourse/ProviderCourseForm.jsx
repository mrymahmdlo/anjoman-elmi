import React, { useEffect, useState } from "react";
import { CCardBody, CCol, CForm, CRow, CLabel } from "@coreui/react";
import { GetData } from "src/Service/APIEngine";
import { FormItems } from "./FormItems";
import { SwitchField, TextField } from "src/Utility/InputGroup";
import { SelectProvider } from "./SelectProvider";

const ArticleForm = ({ form, setForm, preData }) => {
  const [groupIds, setGroupIds] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [providerId, setProviderId] = useState();

  // useEffect(() => {
  //   if (form.writerProviderId) setProviderId(form.writerProviderId);
  // }, [form]);

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
        <CLabel className="m-2"></CLabel>
        <CRow>{items.slice(0, 2)}</CRow>
        <CRow>
          
          <CCol sm={4}>
            <SelectProvider
              providerId={providerId}
              setProviderId={setProviderId}
            />
          </CCol>
        </CRow>

        <CRow>
          {/* {SwitchField(FormItems(form, setForm, groupIds, courseIds)[4])} */}
        </CRow>
      </CForm>
    </CCardBody>
  );
};

export default ArticleForm;
