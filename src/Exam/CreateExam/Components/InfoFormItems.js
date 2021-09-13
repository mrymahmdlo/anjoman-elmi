import { DateTimePickerToGeorgian } from "src/reusable/DateTimePickerToGeorgian";
import {
  FormNumberInput,
  FormSwitchInput,
  FormTextInput,
} from "src/reusable/FormInput";

const {
  CCol,
  CFormGroup,
  CLabel,
  CInputCheckbox,
  CFormText,
} = require("@coreui/react");

const InfoFormItems = (form, setForm) => {
  return [
    {
      name: "نام آزمون",
      text: "نام آزمون را وارد کنید",
      input: FormTextInput(form, setForm, "QuizTitle", "عنوان"),
      size: 4,
    },
    {
      name: "تعداد کل سوالات آزمون",
      text: "مجموع تعداد سوالات آزمون را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "QuestionCount",
        "تعداد",
        0,
        null,
        () => form.QuestionCount > "0"
      ),
      size: 4,
    },
    {
      name: "زمان کل آزمون",
      text: "مجموع زمان پاسخ دهی به آزمون را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "TotalTimeMinutes",
        "زمان به دقیقه",
        0,
        null,
        () => form.TotalTimeMinutes > "0"
      ),
      size: 4,
    },
    {
      name: "تعداد شرکت کننده",
      text: "تعداد شرکت کننده را وارد کنید، تعداد 0 به معنی نامحدود است",
      input: FormNumberInput(
        form,
        setForm,
        "StudentCount",
        "تعداد",
        0,
        null,
        () => form.StudentCount >= "0"
      ),
      size: 4,
    },
    {
      name: "قیمت آزمون",
      text: "قیمت این آزمون کامل را به ریال وارد کنید، اگر 0 وارد شود رایگان محصوب شده یا با قسمت محصول دیگری حساب میشود",
      input: FormNumberInput(
        form,
        setForm,
        "Price",
        "قیمت به ریال",
        0,
        null,
        () => form.Price >= "0"
      ),
      size: 4,
    },
    {
      name: "زمان شروع آزمون",
      text: "تاریخ و ساعت شروع آزمون را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="StartDate"
          value={form.StartDate}
          onChange={(e) => setForm({ ...form, StartDate: e })}
        />
      ),
      size: 4,
    },
    {
      name: "زمان اتمام آزمون",
      text: "تاریخ و ساعت تمام شدن آزمون را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="EndDate"
          value={form.EndDate}
          onChange={(e) => {
            setForm({ ...form, EndDate: e });
          }}
        />
      ),
      size: 4,
    },
    {
      name: "زمان دسترسی به کارنامه آزمون",
      text: "تاریخ و ساعت دسترسی به کارنامه شخصی دانش آموز را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="ResultDate"
          value={form.ResultDate}
          onChange={(e) => setForm({ ...form, ResultDate: e })}
        />
      ),
      size: 4,
    },
    {
      name: "نمایش کارنامه بعد آزمون",
      text: "به محض اتمام آزمون، کارنامه به دانش آموز نمایش داده شود.",
      input: FormSwitchInput(form, setForm, "ShowResultImmediately", false),
      size: 3,
    },
    {
      name: "انتشار آزمون",
      text: "سوالات آزمون ثبت شده و آماده شرکت کردن می باشد.",
      input: FormSwitchInput(form, setForm, "IsValid", false),

      size: 3,
    },
    {
      name: "آزمون به صورت pdf",
      text: "آزمون طرح شده در حالت pdf نیز قابل شرکت است.",
      input: FormSwitchInput(form, setForm, "QuestionFileReady", false),
      size: 3,
    },
    {
      name: "فایل پاسخ نامه",
      text: " فایل pdf پاسخ نامه موجود است.",
      input: FormSwitchInput(form, setForm, "AnswerFileReady", false),
      size: 3,
    },
  ];
};

const GroupIdSelect = (groupIds, form, setForm) => {
  return (
    <CCol sm="4">
      <CFormGroup>
        <CLabel htmlFor="nf-title">گروه آزمایشی آزمون را مشخص کنید</CLabel>
        {groupIds.map((item, key) => (
          <>
            <CFormGroup key={key} variant="checkbox" className="checkbox">
              <CInputCheckbox
                id={"checkbox-" + key}
                name="checkbox1"
                value={item.id}
                onChange={(e) => {
                  let arry = form.GroupCodes;
                  e.target.checked
                    ? arry.push(+e.target.value)
                    : (arry = arry.filter((x) => x !== +e.target.value));
                  setForm({
                    ...form,
                    GroupCodes: arry,
                  });
                }}
              />
              <CLabel
                variant="checkbox"
                className="form-check-label"
                htmlFor="checkbox1"
              >
                {item.name}
              </CLabel>
            </CFormGroup>
          </>
        ))}
        <CFormText className="help-block">
          {" "}
          تا لود شدن گروه ها منتظر بمانید
        </CFormText>
      </CFormGroup>
    </CCol>
  );
};

export { GroupIdSelect, InfoFormItems };
