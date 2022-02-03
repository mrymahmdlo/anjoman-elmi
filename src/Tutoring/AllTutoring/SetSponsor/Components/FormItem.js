import {CSelect} from "@coreui/react";
import React from "react";

const FormItemsSetSponsor = (form, setForm, sponsors) => {

  return [
    {
      name: "",
      text: "",
      input: (
        <CSelect
          value={sponsors.userId}
          defaultValue={sponsors.userId}
          onChange={(e) => setForm({ ...form, sponserId: Number(e.target.value) })}
        >
          <option value={-1}>اسپانسر را انتخاب کنید</option>
          {sponsors.length > 0 ? (
            sponsors.map((item) => (
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

export { FormItemsSetSponsor };
