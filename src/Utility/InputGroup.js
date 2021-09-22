import { CCol, CFormGroup, CFormText, CLabel } from "@coreui/react";

const TextField = (item) => (
  <CCol sm={item.colSize} key={item.name}>
    <CFormGroup>
      <CLabel htmlFor="nf-title">{item.name}</CLabel>
      {item.input}
      <CFormText className="help-block">{item.text}</CFormText>
    </CFormGroup>
  </CCol>
);

const SwitchField = (item) => (
  <CCol sm={item.colSize} key={item.name}>
    <CFormGroup>
      <CCol sm="9">
        <CLabel htmlFor="nf-title">{item.name}</CLabel>
      </CCol>
      <CCol sm="3">{item.input}</CCol>
      <CFormText className="help-block">{item.text}</CFormText>
    </CFormGroup>
  </CCol>
);


export { TextField, SwitchField };
