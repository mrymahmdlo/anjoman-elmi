import { DateTimePickerToGeorgian } from "src/reusable/DateTimePickerToGeorgian";

const FormItems = (form, setForm) => {
  return [
    {
      name: "زمان تدریس خصوصی",
      text: "تاریخ و ساعت دسترسی به تدریس خصصوصی دانش آموز را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="startDateRange"
          value={form.startDateRange}
          onChange={(e) => {
            setForm({ ...form, startDateRange: e });
          }}
        />
      ),
      size: 4,
    },
  ];
};

export { FormItems };
