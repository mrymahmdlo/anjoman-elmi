import { useEffect, useState } from "react";
import { APICorePost } from "src/Service/APIBase";
import Select from "react-select";
import React from "react";
// todo
// change it to import
const { CCol, CFormGroup, CLabel, CFormText } = require("@coreui/react");

const MultiselectProvider = ({ form, setForm }) => {
  const [providers, setProviders] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    APICorePost("Provider/Webinar").then((res) => {
      setProviders(res.data);
    });
  }, []);

  const options = providers.map((item) => ({
    value: item.providerId,
    label: item.name + " " + item.lastName,
  }));

  const defaultValue =
    form.providerIds ?
      form.providerIds.map((item) => ({
        value: item.userId,
        label: item.name + " " + item.lastName,
      }))
      : null;

  return (
    <>
      <CCol sm="6">
        <CFormGroup>
          <CLabel htmlFor="nf-title">مشاور را انتخاب کنید</CLabel>
          <Select
            isSearchable
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            options={options}
            value={selected===null ? defaultValue : selected}
            onChange={(e) => {
              setSelected(e);
              let arry = e ? e.map((item) => item.value) : null;
              setForm({
                ...form,
                providerIds: arry,
              });
            }}
          />
          <CFormText className="help-block">
            {" "}
            تا لود شدن مشاور ها منتظر بمانید
          </CFormText>
        </CFormGroup>
      </CCol>
    </>
  );
};

export { MultiselectProvider };
