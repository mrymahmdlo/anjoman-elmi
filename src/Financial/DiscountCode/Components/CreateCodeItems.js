import { FormNumberInput, FormRadioInput } from "src/reusable/FormInput";

const CreateCodeItems = (form, setForm) => {
  return [
    {
      name: "نوع کد تخفیف",
      text: "کد تخفیف را میتوانید به صورت درصدی یا مبلغ مشخص ، تعیین کنید",
      input: FormRadioInput(form, setForm, "isPercent", [
        { id: "true", name: "درصدی" },
        { id: "false", name: "مبلغ مشخص" },
      ]),
      size: 3,
    },
    {
      name: "تعداد دفعات مجاز استفاده",
      text: "تعداد دفعاتی که دانش آموز میتواند از این کد استفاده کند را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "totalUseableCount",
        "تعداد",
        0,
        null,
        () => form.totalUseableCount > "0"
      ),
      size: 4,
    },
    {
      name: "مقدار تخفیف",
      text: "مقدار درصد تخفیف را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "amount",
        "درصد",
        0,
        100,
        () => form.amount > 0 && +form.amount <= 100
      ),
      size: 4,
    },

    {
      name: "مقدار تخفیف",
      text: "مبلغ تخفیف را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "amount",
        "مبلغ به ریال",
        0,
        null,
        () => form.amount > "0"
      ),
      size: 4,
    },
  ];
};

export default CreateCodeItems;
