import { FormNumberInput } from "src/reusable/FormInput";
import {CSelect} from "@coreui/react";
import React from "react";
import {DateTimePickerToGeorgian} from "../../../reusable/DateTimePickerToGeorgian";
import Select from "react-select";

export const FormItems = (form, setForm, tutorials, providers) => {

  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 35,
      width: 340,
      minHeight: 35,
    }),
    option: (provided) => ({
      ...provided,
      textAlign: "right",
    }),
  };

  return [
    {
      name: "",
      text: "",
      input: (
        <CSelect
          value={form.groupId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
        >
          <option value={-1}>جلسه را انتخاب کنید</option>
          {tutorials.length > 0 ? (
            tutorials?.map((item) => (
              <option value={item.productId} key={item.productId}>
                {item.title}
              </option>
            ))
          ) : (
            <option>جلسه ای وجود ندارد</option>
          )}
        </CSelect>
      ),
      size: 6,
    },
    {
      name: "",
      text: "",
      input: (
        <Select
          options={providers.map((opt) => ({
            label: opt.name + " " + opt.lastName,
            value: opt.name + " " + opt.lastName,
          }))}
          defaultValue={{ label: "ارائه دهنده را انتخاب کنید" }}
          styles={customStyles}
       
        />
      
      ),
      size: 6,
    },
    {
      name: "",
      text: "",
      input: FormNumberInput(
        form,
        setForm,
        "userPhoneNumber",
        "شماره ی دانش آموز",
        0,
        null,
        () => form.userPhoneNumber >= "0",
        () => form.userPhoneNumber?.length >= "11"
      ),
      size: 3,
    },
    {
      name: "وضعیت درس",
      text: "وضعیت درس را انتخاب کنید",
      input: (
        <CSelect
          custom
          name="isOffline"
          style={{ width: "100%" }}
          onChange={(e) => setForm({ ...form, isOnline: +e.target.value })}
        >
          <option value={-1}>وضعیت درس</option>
          <option value={1}>آنلاین</option>
          <option value={0}>آفلاین</option>
        </CSelect>
      ),
      size: 6,
    },
    {
      name: "تاریخ و ساعت برگزاری",
      text: "تاریخ و ساعت برگزاری آزمون را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="startDate"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e })}
        />
      ),
      size: 6,
    },
  ];
};
