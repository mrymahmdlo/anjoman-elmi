import React from "react";
import { CCardBody, CForm, CRow } from "@coreui/react";
import { FormItemsDownloadExcel } from "./FormItems";
import { TextField } from "src/Utility/InputGroup";

const DownloadExcelForm = ({ form, setForm }) => {
  const items = FormItemsDownloadExcel(form, setForm).map((item) => TextField(item));

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items.slice(0,2)}</CRow>
      </CForm>
    </CCardBody>
  );
};

export default DownloadExcelForm;
