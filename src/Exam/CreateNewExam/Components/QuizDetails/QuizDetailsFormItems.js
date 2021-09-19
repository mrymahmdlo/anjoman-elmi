import { CSelect } from "@coreui/react";

const { FormNumberInput, FormTextInput } = require("src/reusable/FormInput");

const QuizDetailsFormItems = (form, setForm, data, courseIds) => {
  return [
    {
      name: "اولویت نمایش",
      text: "ترتیبی زیرآزمون هایی است که دانش آموز در کارنامه مشاهده میکند",
      input: FormNumberInput(
        form,
        setForm,
        "RowId",
        "شماره",
        0,
        null,
        () => form.RowId > "0"
      ),
      size: 6,
    },
    {
      name: "نام زیرآزمون",
      text: "نام زیرآزمون را وارد کنید",
      input: FormTextInput(form, setForm, "CourseName", "نام"),
      size: 6,
    },
    {
      name: "درس مربوطه",
      text: "درس مرتبط با این زیرآزمون را انتخاب کنید",
      input: (
        <CSelect
          value={form.CourseId}
          onChange={(e) => {
            setForm({ ...form, CourseId: e.target.value });
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
        "TotalMinutes",
        "زمان به دقیقه",
        0,
        null,
        () => form.TotalMinutes > "0"
      ),
      size: 6,
    },
    {
      name: "شماره سوال اول",
      text: "شماره اولین سوال این زیرآزمون را مشخص کنید",
      input: FormNumberInput(
        form,
        setForm,
        "StartPos",
        "شماره سوال",
        0,
        null, //اضافه کردن ماکس
        () => form.StartPos > "0"
      ),
      size: 6,
    },
    {
      name: "تعداد سوالات این زیرآزمون",
      text: "تعداد سوالات این زیرآزمون را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "QuestionCount",
        "تعداد سوال زیرآزمون",
        0,
        null, //اضافه شود
        () => form.QuestionCount > "0"
      ),
      size: 6,
    },
  ];
};

export { QuizDetailsFormItems };
