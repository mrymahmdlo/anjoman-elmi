import React from "react";
import { CCardBody, CForm, CRow } from "@coreui/react";
import { FormItemsSubscriptions } from "./FormItems";
import { TextField } from "src/Utility/InputGroup";

const SubscriptionsForm = ({ form, setForm }) => {
  const items = FormItemsSubscriptions(form, setForm).map((item) => TextField(item));

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>{items.slice(0, 2)}</CRow>
        <CRow>{items.slice(2, 4)}</CRow>
      </CForm>
    </CCardBody>
  );
};

export default SubscriptionsForm;
