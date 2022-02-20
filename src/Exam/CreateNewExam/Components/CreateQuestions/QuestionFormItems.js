import { CSelect } from "@coreui/react";
import * as React from "react";

import { FormNumberInput, FormTextInput } from "src/reusable/FormInput";

const QuestionFormItems = (form, setForm, levels) => {
  return [
    {
      name: "شماره سوال",
      text: "شماره سوال به ترتیب داده میشود، اگر سوال دیگری را وارد میکنید،این عدد را تغییر دهید",
      input: FormNumberInput(
        form,
        setForm,
        "questionNo",
        "شماره",
        0,
        null,
        () => form.questionNo > "0"
      ),
      size: 6,
    },
    {
      name: "نام طراح",
      text: "نام طراح این سوال را وارد کنید",
      input: FormTextInput(form, setForm, "designerName", "نام"),
      size: 6,
    },
    {
      name: "شماره گزینه صحیح",
      text: "شماره گزینه صحیح را مشخص کنید",
      input: (
        <CSelect
          onChange={(e) => {
            setForm({ ...form, correctAnswerNo: e.target.value });
          }}
        >
          {[
            { id: "1", name: "گزینه یک" },
            { id: "2", name: "گزینه دو" },
            { id: "3", name: "گزینه سه" },
            { id: "4", name: "گزینه چهار" },
          ].map((item, index) => (
            <option
              key={index}
              value={item.id}
              selected={`${form.correctAnswerNo}` === item.id}
            >
              {item.name}
            </option>
          ))}
        </CSelect>
      ),
      size: 6,
    },
    {
      name: "سطح سوال",
      text: "درجه سختی سوال را مشخص کنید",
      input: (
        <CSelect
          onChange={(e) => {
            setForm({ ...form, questionLevel: e.target.value });
          }}
        >
          {levels.map((item, index) => (
            <option
              key={index}
              value={item.id}
              selected={`${form.questionLevel}` === item.id}
            >
              {item.name}
            </option>
          ))}
        </CSelect>
      ),
      size: 6,
    },
  ];
};

export { QuestionFormItems };
