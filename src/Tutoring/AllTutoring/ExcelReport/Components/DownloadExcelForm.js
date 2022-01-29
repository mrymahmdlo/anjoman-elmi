import React from "react";
import { CCardBody, CForm, CRow } from "@coreui/react";
import { FormItems } from "./FormItems";
import { TextField } from "src/Utility/InputGroup";

const DownloadExcelForm = ({ form, setForm, providers }) => {
  const items = FormItems(form, setForm, providers).map((item) => TextField(item));

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items.slice(0,2)}</CRow>
        <CRow>{items.slice(2,4)}</CRow>
      </CForm>
    </CCardBody>
  );
};

export default DownloadExcelForm;
