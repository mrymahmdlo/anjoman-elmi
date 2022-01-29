import {CSelect} from "@coreui/react";
import React from "react";

const FormItems = (form, setForm, sponsers) => {

  return [
    {
      name: "",
      text: "",
      input: (
        <CSelect
          value={sponsers.userId}
          defaultValue={sponsers.userId}
          onChange={(e) => setForm({ ...form, sponserId: Number(e.target.value) })}
        >
          <option value={-1}>اسپانسر را انتخاب کنید</option>
          {sponsers.length > 0 ? (
            sponsers.map((item) => (
              <option
                value={item.userId}
                key={item.userId}
                selected={form.userId === item.userId}
              >
                {item.sponserName}
              </option>
            ))
          ) : (
            <option>اسپانسری وجود ندارد</option>
          )}
        </CSelect>
      ),
      size: 6,
    },
  ];
};

export { FormItems };
