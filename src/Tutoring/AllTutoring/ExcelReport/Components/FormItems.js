import { DateTimePickerToGeorgian } from "src/reusable/DateTimePickerToGeorgian";
import {CSelect} from "@coreui/react";
import React from "react";
import {FormNumberInput} from "../../../../reusable/FormInput";

const FormItems = (form, setForm, providers) => {

  return [
    {
      name: "",
      text: "",
      input: (
        <CSelect
          value={form.providerId}
          defaultValue={form.providerId}
          onChange={(e) => setForm({ ...form, providerId: Number(e.target.value) })}
        >
          <option value={-1}>ارائه دهنده را انتخاب کنید</option>
          {providers.length > 0 ? (
            providers.map((item) => (
              <option
                value={item.providerId}
                key={item.providerId}
                selected={form.providerId === item.providerId}
              >
                {item.name + " " + item.lastName}
              </option>
            ))
          ) : (
            <option>پشتیبانی وجود ندارد</option>
          )}
        </CSelect>
      ),
      size: 6,
    },
    {
      name: "",
      text: "کد دانش آموز را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "studentId",
        "کد دانش آموز",
        0,
        null,
        () => form.studentId >= "0"
      ),
      size: 6,
    },
    {
      name: "زمان شروع",
      text: "زمان شروع را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="startDateRange"
          value={form.FromTime}
          onChange={(e) => setForm({ ...form, FromTime: e })}
        />
      ),
      size: 6,
    },
    {
      name: "زمان پایان",
      text: "زمان پایان را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="startDateRange"
          value={form.ToTime}
          onChange={(e) => setForm({ ...form, ToTime: e })}
        />
      ),
      size: 6,
    },
  ];
};

export { FormItems };
