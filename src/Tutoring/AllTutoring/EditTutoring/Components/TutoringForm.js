import React from "react";
import { CCardBody, CForm, CRow } from "@coreui/react";
import { FormItems } from "./FormItem";
import { TextField } from "src/Utility/InputGroup";

const TutoringForm = ({ form, setForm, providers, tutorials }) => {
  const items = FormItems(form, setForm, providers, tutorials).map((item) => TextField(item));

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items[0]}</CRow>
        <CRow>{items[1]}</CRow>
        <CRow>{items[2]}</CRow>
      </CForm>
    </CCardBody>
  );
};

export default TutoringForm;
