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
          value={
            form.buyDateTime
              ? timePattern(form.buyDateTime)
              : form.buyDateTime
          }
          onChange={(e) => {
            form.buyDateTime = HejriToDotNetGeorgian(e);
            setForm({ ...form, buyDateTime: +e.target.value });
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
          value={
            form.joinDatetime
              ? timePattern(form.joinDatetime)
              : form.joinDatetime
          }
          onChange={(e) => {
            form.joinDatetime = HejriToDotNetGeorgian(e);
            setForm({ ...form, joinDatetime: +e.target.value });
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
          value={
            form.cancelDatetime
              ? timePattern(form.cancelDatetime)
              : form.cancelDatetime
          }
          onChange={(e) => {
            form.cancelDatetime = HejriToDotNetGeorgian(e);
            setForm({ ...form, cancelDatetime: +e.target.value });
          }}
        />
      ),
      size: 4,
    },
  ];
};
