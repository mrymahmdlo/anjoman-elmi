import { DateTimePickerToGeorgian } from "src/reusable/DateTimePickerToGeorgian";
import React from "react";

const FormItemsDownloadExcel = (form, setForm) => {
  // todo
  return [
    {
      name: "زمان شروع",
      text: "زمان شروع را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="startDateRange"
          value={form.fromTime}
          onChange={(e) => setForm({ ...form, fromTime: e })}
        />
      ),
      size: 6,
    },
    {
      name: "زمان پایان",
      text: "زمان پایان را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="endDateRange"
          value={form.toTime}
          onChange={(e) => setForm({ ...form, toTime: e })}
        />
      ),
      size: 6,
    },
  ];
};

export { FormItemsDownloadExcel };
