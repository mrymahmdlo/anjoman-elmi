import { FormNumberInput } from "src/reusable/FormInput";

export const FormItems = (form, setForm) => {
  return [
    {
      name: "زمان شروع",
      text: "زمان شروع را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "startPeriodHour",
        "زمان شروع",
        0,
        null,
        () => form.startPeriodHour >= "0"
      ),
      size: 4,
    },
    {
      name: "زمان پایان",
      text: "زمان پایان را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "endPeriodHour",
        "زمان پایان",
        0,
        null,
        () => form.endPeriodHour >= "0"
      ),
      size: 4,
    },
    {
      name: "ظرفیت تدریس",
      text: "ظرفیت تدریس را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "rechargeCapacityAmountHour",
        "ظرفیت تدریس",
        0,
        null,
        () => form.rechargeCapacityAmountHour >= "0"
      ),
      size: 4,
    },
  ];
};
