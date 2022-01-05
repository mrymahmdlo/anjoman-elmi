import React from "react";
import { CCardBody, CForm, CRow } from "@coreui/react";
import { FormItems } from "./FormItem";
import { TextField } from "src/Utility/InputGroup";

const TutoringForm = ({ form, setForm, preData }) => {
  const items = FormItems(form, setForm).map((item) => TextField(item));

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items.slice(0)}</CRow>
      </CForm>
    </CCardBody>
  );
};

export default TutoringForm;
