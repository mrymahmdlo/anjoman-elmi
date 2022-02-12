import { FormNumberInput } from "src/reusable/FormInput";

export const FormItemsCapacityRegistration = (form, setForm) => {
  return [
    {
      name: "ظرفیت مدرس :",
      text: "ظرفیت مدرس را به ساعت وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "rechargeAmountHour",
        "ظرفیت مدرس",
        0,
        null,
        //todo
        () => form.rechargeAmountHour >= "0"
      ),
      size: 4,
    },
  ];
};
