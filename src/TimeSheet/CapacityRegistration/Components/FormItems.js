import { FormNumberInput } from "src/reusable/FormInput";
export const FormItems = (form, setForm) => {
  return [
    {
      name: "ظرفیت مدرس",
      text: "ظرفیت مدرس را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "capacity",
        "ظرفیت مدرس",
        0,
        null,
        () => form.capacity >= "0"
      ),
      size: 1,
    },
 
  ];
};
