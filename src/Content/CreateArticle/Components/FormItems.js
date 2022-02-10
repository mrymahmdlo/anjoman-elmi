import { FormSwitchInput, FormTextInput } from "src/reusable/FormInput";
import * as React from "react";
// todo
// change it to import
const { CSelect } = require("@coreui/react");

export const FormItemsArticles = (form, setForm, groupIds, courseIds) => {
  return [
    {
      name: "عنوان محتوای عمومی",
      text: "عنوان محتوای خود را وارد کنید",
      input: FormTextInput(form, setForm, "title", "عنوان"),
      size: 6,
    },
    {
      name: "زمان تقریبی مطالعه مقاله",
      text: "زمان تقریبی به دقیقه برای خواندن این محتوا را تعیین کنید.",
      input: FormTextInput(form, setForm, "timeToStudy", "زمان مطالعه"),
      size: 6,
    },
    {
      name: "مقطع تحصیلی",
      text: "مقطع تحصیلی مخاطب این محتوا را وارد کنید",
      input: (
        <CSelect
          custom
          name="groupId"
          style={{ width: "100%" }}
          defaultValue={form.groupId}
          value={form.groupId}
          onChange={(e) => setForm({ ...form, groupId: +e.target.value })}
        >
          <option value={0}>همه</option>
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
      size: 6,
    },
    {
      name: "درس",
      text: "درس مربوطه به این محتوا را انتخاب کنید",
      input: (
        <CSelect
          custom
          name="courseId"
          style={{ width: "100%" }}
          defaultValue={form.courseId}
          value={form.courseId}
          onChange={(e) => setForm({ ...form, courseId: +e.target.value })}
        >
          <option value={0}>همه</option>
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
      size: 6,
    },
    {
      name: "محتوای مهم",
      text: "در صورت فعال شدن، در محتواهای اصلی سایت نمایش داده میشود",
      input: FormSwitchInput(form, setForm, "isImportant", form.isImportant),
      size: 6,
    },
  ];
};
