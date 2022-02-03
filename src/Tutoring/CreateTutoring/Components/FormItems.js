import {
  FormTextInput,
  FormNumberInput,
} from "src/reusable/FormInput";
const { CSelect } = require("@coreui/react");

export const FormItemsCreateTutoring = (form, setForm, groupIds, courseIds) => {
  console.log('sss',form.courseId)
  console.log('ws',courseIds);
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
      text: "وضعیت درس را انتخاب کنید",
      input: (
        <CSelect
          custom
          name="isOffline"
          style={{ width: "100%" }}
          onChange={(e) => setForm({ ...form, isOffline: +e.target.value })}
        >
          <option value={-1}>وضعیت درس</option>
          <option value={0}>آنلاین</option>
          <option value={1}>آفلاین</option>
        </CSelect>
      ),
      size: 4,
    },
  ];
};
