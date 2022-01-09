import React, { useEffect, useState } from "react";
import {
  CCardBody,
  CForm,
  CRow,
  CSelect,
  CFormGroup,
  CCol,
  CLabel,
} from "@coreui/react";
import {GetData, PostData} from "src/Service/APIEngine";
import { FormItems } from "./FormItems";
import { TextField } from "../../../Utility/InputGroup";
import { GetDataBroad } from "../../../Service/APIBroadCast";

const TutoringForm = ({ form, setForm }) => {
  const [tutorials, setTutorials] = useState([]);
  const [groupIds, setGroupIds] = useState([]);
  const [groupId, setGroupId] = useState(0);
  const [providers, setProviders] = useState([]);
  const [providerId, setProviderId] = useState();

  useEffect(() => {
    GetData("BasicInfo/Groups").then((res) => setGroupIds(res));
  }, []);

  const getTutorials = (groupId) => {
    GetDataBroad(`Admin/GetAllTutorialForAdmin?groupId=${groupId}`).then(
      (res) => setTutorials(res.data)
    );
  };

  useEffect(() => {
    PostData("Provider/Tutoring", {
      GroupIds: [groupId],
    }).then((res) => {
      setProviders(res.data);
    });
  }, [groupId]);

  useEffect(() => {
    if (form.providerId) setProviderId(form.providerId);
  }, [form]);

  useEffect(() => {
    setForm({ ...form, providerId: providerId });
  }, [providerId]);

  const items = FormItems(form, setForm, tutorials, providers).map(
    (item) => TextField(item)
  );

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CFormGroup className="m-3">
          <CLabel className="pr-1" style={{ color: "red" }}>
            ابتدا گروه آزمایشی خود را انتخاب کنید
          </CLabel>
          <CRow>
            <CCol sm={4}>
              <CSelect
                value={form.groupId}
                defaultValue={groupId}
                onChange={(e) => {
                  getTutorials(e.target.value);
                  setGroupId(e.target.value);
               
                }}
              >
                <option value={-1}>گروه آزمایشی را انتخاب کنید</option>
                {groupIds.map((item, key) => (
                  <option key={key.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CRow>
        </CFormGroup>
        <CFormGroup >
          <CRow>
            <CCol>
              <CRow>{items}</CRow>
            </CCol>
          </CRow>
        </CFormGroup>
      </CForm>
    </CCardBody>
  );
};

export default TutoringForm;
