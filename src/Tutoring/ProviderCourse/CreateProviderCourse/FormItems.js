import React from "react";
// todo
// change it to import
const { CSelect } = require("@coreui/react");

export const FormItemsProviderCourse = (form, setForm, groupIds, courseIds) => {
  return [
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
      size: 6,
    },
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
      size: 6,
    },
  ];
};
