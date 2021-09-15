const { FormNumberInput, FormTextInput } = require("src/reusable/FormInput");

const QuizDetailsFormItems = (form, setForm) => {
  return [
    {
      name: "شماره کوییز(حذف)",
      text: "شماره این آزمون",
      input: <input disabled class="form-control" placeholder={form.QuizId} />,
      size: 3,
    },
    {
      name: "آیدی سطر(فرانت)",
      text: "توضیح؟",
      input: FormNumberInput(
        form,
        setForm,
        "",
        "عدد",
        0,
        null,
        () => form > "0"
      ),
      size: 3,
    },
    {
      name: " اسم درس - اسم بخش یا زیردرس",
      text: "توضیح؟",
      input: FormTextInput(form, setForm, "", "رشته حرف"),
      size: 3,
    },
    {
      name: " آیدی درس -- درس ",
      text: "توضیح؟",
      input: FormTextInput(form, setForm, "", "دراپ دون"),
      size: 3,
    },
    {
      name: "شماره سوال اول این درس",
      text: "توضیح؟",
      input: FormNumberInput(
        form,
        setForm,
        "",
        "عدد",
        0,
        null,
        () => form > "0"
      ),
      size: 3,
    },
    {
      name: "تعداد سوالات این درس",
      text: "توضیح؟",
      input: FormNumberInput(
        form,
        setForm,
        "",
        "عدد",
        0,
        null,
        () => form > "0"
      ),
      size: 3,
    },
    {
      name: "زمان پیشنهادی",
      text: "توضیح؟",
      input: FormNumberInput(
        form,
        setForm,
        "",
        "عدد",
        0,
        null,
        () => form > "0"
      ),
      size: 3,
    },
  ];
};

export { QuizDetailsFormItems };
