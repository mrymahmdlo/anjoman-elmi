import { useEffect, useState } from "react";

const { CInput, CSwitch } = require("@coreui/react");

const FormTextInput = (form, setForm, nameField, placeHolder) => {
  const [isValid, setValid] = useState(form[nameField]?.length > 0);
  useEffect(() => {
    const valid = form[nameField]?.length > 0;
    setValid(valid);
  }, [nameField, form]);
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
      value={form[nameField] ? form[nameField] : ""}
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
  const [isValid, setValid] = useState(validation());
  useEffect(() => {
    const valid = validation ? validation() : form[nameField];
    setValid(valid);
  }, [nameField, form, validation]);
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
      value={
        form[nameField] ? form[nameField] : form[nameField] === 0 ? "0" : ""
      }
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
          [name]: e.target.value === "on" ? true : false,
        })
      }
      defaultChecked={Checked}
    />
  );
};

const FormRadioInput = (form, setForm, nameField, group) => {
  return (
    <div
      className="form-check"
      onChange={(e) => {
        setForm({ ...form, [nameField]: e.target.value });
      }}
    >
      {group.map((item) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value={item.id}
            checked={form[nameField] === item.id}
          />
          {item.name}
        </div>
      ))}
    </div>
  );
};

export { FormTextInput, FormNumberInput, FormSwitchInput, FormRadioInput };
