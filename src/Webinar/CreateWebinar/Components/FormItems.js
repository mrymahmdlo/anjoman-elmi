import { FormSwitchInput, FormTextInput } from "src/reusable/FormInput";
import { DateTimePickerToGeorgian } from "src/reusable/DateTimePickerToGeorgian";
const { CSelect } = require("@coreui/react");

export const FormItems = (form, setForm, groupIds, courseIds) => {
  return [
    // {
    //   name: "عنوان  همایش",
    //   text: "عنوان همایش خود را وارد کنید",
    //   input: FormTextInput(form, setForm, "title", "عنوان"),
    //   size: 6,
    // },
    {
      name: "زمان  همایش",
      text: "مدت زمان این همایش را تعیین کنید",
      input: FormTextInput(form, setForm, "duration", "زمان همایش"),
      size: 6,
    },
    {
      name: "تعداد جلسات",
      text: "تعداد جلسات این همایش را  تعیین کنید",
      input: FormTextInput(form, setForm, "countOfSession", "تعداد جلسات"),
      size: 6,
    },
    {
      name: "ظرفیت",
      text: "تعداد ظرفیت این همایش را  تعیین کنید",
      input: FormTextInput(form, setForm, "capacity", "تعداد ظرفیت"),
      size: 6,
    },
    {
      name: "مقطع تحصیلی",
      text: "مقطع تحصیلی مخاطب این همایش را وارد کنید",
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
      text: "درس مربوطه به این همایش را انتخاب کنید",
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
    {
      name: "زمان شروع همایش",
      text: "تاریخ و ساعت شروع همایش را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="startDateTime"
          value={form.schedules[0].startDateTime}
          onChange={(e) => {
            form.schedules[0].startDateTime = e;
            setForm(form);
          }}
        />
      ),
      size: 4,
    },
    {
      name: "زمان اتمام همایش",
      text: "تاریخ و ساعت تمام شدن همایش را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="endDateTime"
          value={form.schedules[0].endDateTime}
          onChange={(e) => {
            form.schedules[0].endDateTime = e;
            setForm(form);
          }}
        />
      ),
      size: 4,
    },
  ];
};
