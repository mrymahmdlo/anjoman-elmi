import { FormTextInput } from "src/reusable/FormInput";
import { DateTimePickerToGeorgian } from "src/reusable/DateTimePickerToGeorgian";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";
const { CSelect } = require("@coreui/react");

const options1 = { weekday: "long" };
const options2 = { hour: "numeric", minute: "numeric" };
const timePattern = (time) => {
  return `${new Date(time).toLocaleDateString("fa-IR", options1)} ${new Date(
    time
  ).toLocaleDateString("fa-IR", options2)}`;
};

export const FormItems = (form, setForm) => {
  return [
    {
      name: "لینک  همایش",
      text: "لینک همایش را وارد کنید",
      input: FormTextInput(
        form,
        setForm,
        "webinarLink",
        "لینک همایش",
        0,
        null,
        () => form.webinarLink >= "0"
      ),
      size: 6,
    },
    {
      name: "زمان خرید همایش",
      text: "تاریخ و ساعت خرید همایش را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="buyDateTime"
          value={form.buyDateTime}
          onChange={(e) => {
            console.log(form.buyDateTime);
            setForm({ ...form, buyDateTime: e });
          }}
        />
      ),
      size: 4,
    },
    {
      name: "زمان ورود همایش",
      text: "تاریخ و ساعت ورود همایش را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="joinDatetime"
          value={form.joinDatetime}
          onChange={(e) => {
            console.log(form.joinDatetime);
            setForm({ ...form, joinDatetime: e });
          }}
        />
      ),
      size: 4,
    },
    {
      name: "زمان کنسل همایش",
      text: "تاریخ و ساعت کنسل همایش را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="cancelDatetime"
          value={form.cancelDatetime}
          onChange={(e) => {
            console.log(form.cancelDatetime);
            setForm({ ...form, cancelDatetime: e });
          }}
        />
      ),
      size: 4,
    },
  ];
};
