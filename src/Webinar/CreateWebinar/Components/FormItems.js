import {
  FormTextInput,
  FormNumberInput,
} from "src/reusable/FormInput";
import { DateTimePickerToGeorgian } from "src/reusable/DateTimePickerToGeorgian";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";
const { CSelect } = require("@coreui/react");

const options1 = {weekday: 'long'};
const options2 = {hour: 'numeric', minute: 'numeric'};
const timePattern=(time)=> {
  return (
    `${new Date(time).toLocaleDateString('fa-IR', options1)} ${new Date(time).toLocaleDateString('fa-IR', options2)}`
  )
};

export const FormItems = (form, setForm, groupIds, courseIds) => {
  return [
    {
      name: "عنوان  همایش",
      text: "عنوان همایش خود را وارد کنید",
      input: FormTextInput(form, setForm, "title", "عنوان"),
      size: 6,
    },
    {
      name: "قیمت همایش",
      text: "قیمت این همایش کامل را به ریال وارد کنید، اگر 0 وارد شود رایگان محصوب  میشود",
      input: FormNumberInput(
        form,
        setForm,
        "priceAfterHolding",
        "قیمت به ریال",
        0,
        null,
        () => form.priceAfterHolding >= "0"
      ),
      size: 4,
    },
    {
      name: "زمان  همایش",
      text: "مدت زمان این همایش را تعیین کنید",
      input: FormNumberInput(
        form,
        setForm,
        "duration",
        "زمان همایش",
        0,
        null,
        () => form.duration >= "0"
      ),
      size: 6,
    },
    {
      name: "تعداد جلسات",
      text: "تعداد جلسات این همایش را  تعیین کنید",
      input: FormNumberInput(
        form,
        setForm,
        "countOfSession",
        "تعداد جلسات",
        0,
        null,
        () => form.countOfSession >= "0"
      ),
      size: 6,
    },
    {
      name: "ظرفیت",
      text: "تعداد ظرفیت این همایش را  تعیین کنید",
      input: FormNumberInput(
        form,
        setForm,
        "capacity",
        "تعداد ظرفیت",
        0,
        null,
        () => form.capacity >= "0"
      ),
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
          value={
            form.schedules[0]?.startDateTime
              ? timePattern(form.schedules[0]?.startDateTime)
              : form.schedules[0]?.startDateTime
          }
          onChange={(e) => {
            let sch = form.schedules;
            sch[0].startDateTime = HejriToDotNetGeorgian(e);
            setForm({ ...form, schedules: sch });
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
          value={
            form.schedules[0]?.endDateTime
              ? timePattern(form.schedules[0]?.endDateTime)
              : form.schedules[0]?.endDateTime
          }
          onChange={(e) => {
            let sch = form.schedules;
            sch[0].endDateTime = HejriToDotNetGeorgian(e);
            setForm({ ...form, schedules: sch });
          }}
        />
      ),
      size: 4,
    },
  ];
};
