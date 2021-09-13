import { useState } from "react";

const { CInput, CSwitch } = require("@coreui/react");

const FormTextInput = (form, setForm, nameField, placeHolder) => {
  const [isValid, setValid] = useState();

  const handleChange = (e) => {
    const valid = e.target.value?.length > 0;
    setValid(valid);
    setForm({ ...form, [nameField]: valid ? e.target.value : null });
  };
  return (
    <CInput
      valid={isValid}
      invalid={!isValid}
      name={nameField}
      placeholder={placeHolder}
      onChange={(e) => {
        handleChange(e);
      }}
    />
  );
};

const FormNumberInput = (
  form,
  setForm,
  nameField,
  placeHolder,
  min,
  max,
  validation
) => {
  const [isValid, setValid] = useState();
  const handleChange = (e) => {
    const valid = validation ? validation() : e.target.value;
    setValid(valid);
    setForm({ ...form, [nameField]: valid ? e.target.value : null });
  };
  return (
    <CInput
      valid={isValid}
      invalid={!isValid}
      type="number"
      name={nameField}
      min={min}
      max={max}
      placeholder={placeHolder}
      required
      onChange={(e) => {
        form[nameField] = e.target.value;
        handleChange(e);
      }}
    />
  );
};

const FormSwitchInput = (form, setForm, name, Checked) => {
  return (
    <CSwitch
      className="mr-1"
      name={name}
      color="primary"
      onChange={(e) =>
        setForm({
          ...form,
          ShowResultImmediately: e.target.value === "on" ? true : false,
        })
      }
      defaultChecked={Checked}
    />
  );
};

export { FormTextInput, FormNumberInput, FormSwitchInput };
