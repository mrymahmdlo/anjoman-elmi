import React from "react";
import { CCardBody, CForm, CRow } from "@coreui/react";
import { FormItemsSetSponsor } from "./FormItem";
import { TextField } from "src/Utility/InputGroup";

const SponsorForm = ({ form, setForm, sponsors }) => {
  const items = FormItemsSetSponsor(form, setForm, sponsors).map((item) => TextField(item));

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items[0]}</CRow>
      </CForm>
    </CCardBody>
  );
};

export default SponsorForm;
