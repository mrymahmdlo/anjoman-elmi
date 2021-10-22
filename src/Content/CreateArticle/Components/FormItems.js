import { FormSwitchInput } from "src/reusable/FormInput";

const { CInput, CSelect } = require("@coreui/react");

export const FormItems = (form, setForm, groupIds, courseIds) => {
  return [
    {
      name: "عنوان محتوای عمومی",
      text: "عنوان محتوای خود را وارد کنید",
      input: (
        <CInput
          type="text"
          name="title"
          placeholder="عنوان"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      ),
      size: 6,
    },
    {
      name: "زمان تقریبی مطالعه مقاله",
      text: "زمان تقریبی به دقیقه برای خواندن این محتوا را تعیین کنید.",
      input: (
        <CInput
          type="text"
          name="timeToStudy"
          placeholder="زمان مطالعه"
          onChange={(e) => setForm({ ...form, timeToStudy: e.target.value })}
        />
      ),
      size: 6,
    },
    {
      name: "مقطع تحصیلی",
      text: "مقطع تحصیلی مخاطب این محتوا را وارد کنید",
      input: (
        <CSelect
          custom
          name="groupId"
          style={{ width: "100%"}}
          onChange={(e) => setForm({ ...form, groupId: +e.target.value })}
        >
          <option value={""}>همه</option>
          {groupIds.map((item, key) => (
            <option key={key} value={item.id}>
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
          style={{ width: "100%"}}
          onChange={(e) => setForm({ ...form, courseId: +e.target.value })}
        >
          <option value={null}>همه</option>
          {courseIds.length > 0
            ? courseIds.map((item, key) => (
                <option key={key} value={item.id}>
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
      input: FormSwitchInput(
        form,
        setForm,
        "isImportant",
        form.isImportant
      ),
      size: 6,
    },
  ];
};
