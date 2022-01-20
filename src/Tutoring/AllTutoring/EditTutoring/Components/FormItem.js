import { DateTimePickerToGeorgian } from "src/reusable/DateTimePickerToGeorgian";
import {CSelect} from "@coreui/react";
import React from "react";

const FormItems = (form, setForm, providers, tutorials) => {

  const options1 = {weekday: 'long'};
  const options2 = {hour: 'numeric', minute: 'numeric'};
  const timePattern=(time)=> {
    return (
      `${new Date(time).toLocaleDateString('fa-IR', options1)} ${new Date(time).toLocaleDateString('fa-IR', options2)}`
    )
  };

  return [
    {
      name: "",
      text: "",
      input: (
        <CSelect
          value={form.providerId}
          defaultValue={form.providerId}
          onChange={(e) => setForm({ ...form, providerId: e.target.value })}
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
      text: "",
      input: (
        <CSelect
          value={form.tutorialId}
          onChange={(e) => setForm({ ...form, tutorialId: e.target.value })}
        >
          <option value={-1}>جلسه را انتخاب کنید</option>
          {tutorials.length > 0 ? (
            tutorials?.map((item) => (
              <option
                value={item.tutorialId}
                key={item.tutorialId}
                selected={form.tutorialId === item.tutorialId}
              >
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
      name: "زمان تدریس خصوصی",
      text: "تاریخ و ساعت دسترسی به تدریس خصصوصی دانش آموز را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="startDateRange"
          value={form.startDateRange}
          onChange={(e) => {
            console.log(form.startDateRange)
            setForm({ ...form, startDateRange: e });
          }}
        />
      ),
      size: 6,
    },
  ];
};

export { FormItems };
