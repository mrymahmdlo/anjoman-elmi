import React from "react";
import { CCardBody, CForm, CRow } from "@coreui/react";
import { FormItemsEditAllTutoring } from "./FormItem";
import { TextField } from "src/Utility/InputGroup";

const EditAllTutoringForm = ({ form, setForm, providers, tutorials }) => {
  const items = FormItemsEditAllTutoring(form, setForm, providers, tutorials).map((item) => TextField(item));

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

export default EditAllTutoringForm;
