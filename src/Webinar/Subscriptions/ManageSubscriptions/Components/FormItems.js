import React from "react";
import {FormRadioInput} from "src/reusable/FormInput";

const FormItemsDownloadExcel = (form, setForm) => {
  return [
    {
      name: "نوع دانش آموزان",
      text: "نوع دانش آموزان را برحسب شرایط ثبت نام مشخص کنید",
      input: FormRadioInput(form, setForm, "subscriberType", [
        { id: "false", name: "همۀ دانش آموزان" },
        { id: "true", name: "دانش آموزانی که ثبت نام کرده اند" },
      ]),
      size: 6,
    },
  ];
};

export { FormItemsDownloadExcel };
