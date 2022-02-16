import { FormTextInput, FormNumberInput } from "src/reusable/FormInput";
import React from "react";
// todo
import { CSelect } from "@coreui/react";

export const FormItemsCreateTutoring = (
  form,
  setForm,
  groupIds,
  courseIds,
  isOffline
) => {
  return [
    {
      name: "عنوان  ",
      text: "عنوان   را وارد کنید",
      input: FormTextInput(form, setForm, "title", "عنوان"),
      size: 6,
    },
    {
      name: "قیمت ",
      text: "قیمت  را به ریال وارد کنید، اگر 0 وارد شود رایگان حساب میشود",
      input: FormNumberInput(
        form,
        setForm,
        "price",
        "قیمت به ریال",
        0,
        null,
        () => form.price >= "0"
      ),
      size: 4,
    },
    // todo
    // reusable component!
    {
      name: "مقطع تحصیلی",
      text: "مقطع تحصیلی مخاطب  را وارد کنید",
      input: (
        <CSelect
          custom
          name="groupId"
          style={{ width: "100%" }}
          onChange={(e) => setForm({ ...form, groupId: +e.target.value })}
        >
          <option value={form.groupId}>همه</option>
          {groupIds.map((item, key) => (
            <option
              key={key}
              value={item.id}
              selected={form.groupId === item.id}
            >
              {item.name}
            </option>
          ))}
        </CSelect>
      ),
      size: 4,
    },
    // todo
    // reusable components
    {
      name: "درس",
      text: "درس مربوطه  را انتخاب کنید",
      input: (
        <CSelect
          custom
          name="courseId"
          style={{ width: "100%" }}
          onChange={(e) => setForm({ ...form, courseId: +e.target.value })}
        >
          <option value={form.courseId}>همه</option>
          {courseIds.length > 0
            ? courseIds.map((item, key) => (
                <option
                  key={key}
                  value={item.id}
                  selected={form.courseId === item.id}
                >
                  {item.name}
                </option>
              ))
            : null}
        </CSelect>
      ),
      size: 4,
    },
    {
      name: "وضعیت درس",
      input: (
        <CSelect
          custom
          name="isOffline"
          style={{ width: "100%" }}
          onChange={(e) => setForm({ ...form, isOffline: +e.target.value })}
        >
          <option value={0} selected={form.isOffline === "آنلاین"}>
            آنلاین
          </option>
          <option value={1} selected={form.isOffline === "آفلاین"}>
            آفلاین
          </option>
        </CSelect>
      ),
      size: 4,
    },
  ];
};
