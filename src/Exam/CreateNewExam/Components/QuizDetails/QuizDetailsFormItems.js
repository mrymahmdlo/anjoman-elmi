import { CSelect } from "@coreui/react";
import * as React from "react";
// todo
// change it to import
const { FormNumberInput, FormTextInput } = require("src/reusable/FormInput");

const QuizDetailsFormItems = (form, setForm, courseIds) => {
  return [
    {
      name: "اولویت نمایش",
      text: "ترتیبی زیرآزمون هایی است که دانش آموز در کارنامه مشاهده میکند",
      input: FormNumberInput(
        form,
        setForm,
        "rowId",
        "شماره",
        0,
        null,
        () => form.rowId > "0"
      ),
      size: 6,
    },
    {
      name: "نام زیرآزمون",
      text: "نام زیرآزمون را وارد کنید",
      input: FormTextInput(form, setForm, "courseName", "نام"),
      size: 6,
    },
    {
      name: "درس مربوطه",
      text: "درس مرتبط با این زیرآزمون را انتخاب کنید",
      input: (
        <CSelect
          value={form.courseId}
          onChange={(e) => {
            setForm({ ...form, courseId: e.target.value });
          }}
        >
          {courseIds.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </CSelect>
      ),
      size: 6,
    },
    {
      name: "زمان پاسخگویی",
      text: "زمان پیشنهادی پاسخگویی به این زیرآزمون را مشخص کنید",
      input: FormNumberInput(
        form,
        setForm,
        "totalMinutes",
        "زمان به دقیقه",
        0,
        null,
        () => form.totalMinutes > "0"
      ),
      size: 6,
    },
    {
      name: "شماره سوال اول",
      text: "شماره اولین سوال این زیرآزمون را مشخص کنید",
      input: FormNumberInput(
        form,
        setForm,
        "startPos",
        "شماره سوال",
        0,
        null,
        () => form.startPos > "0"
      ),
      size: 6,
    },
    {
      name: "تعداد سوالات این زیرآزمون",
      text: "تعداد سوالات این زیرآزمون را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "questionCount",
        "تعداد سوال زیرآزمون",
        0,
        null,
        () => form.questionCount > "0"
      ),
      size: 6,
    },
  ];
};

export { QuizDetailsFormItems };
