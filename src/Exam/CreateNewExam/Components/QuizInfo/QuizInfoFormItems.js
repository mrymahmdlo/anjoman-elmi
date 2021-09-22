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
  CSelect,
} = require("@coreui/react");

const QuizInfoFormItems = (form, setForm) => {
  return [
    {
      name: "نام آزمون",
      text: "نام آزمون را وارد کنید",
      input: FormTextInput(form, setForm, "quizTitle", "عنوان"),
      size: 4,
    },
    {
      name: "تعداد کل سوالات آزمون",
      text: "مجموع تعداد سوالات آزمون را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "questionCount",
        "تعداد",
        0,
        null,
        () => form.questionCount > "0"
      ),
      size: 4,
    },
    {
      name: "زمان کل آزمون",
      text: "مجموع زمان پاسخ دهی به آزمون را وارد کنید",
      input: FormNumberInput(
        form,
        setForm,
        "totalTimeMinutes",
        "زمان به دقیقه",
        0,
        null,
        () => form.totalTimeMinutes > "0"
      ),
      size: 4,
    },
    {
      name: "تعداد شرکت کننده",
      text: "تعداد شرکت کننده را وارد کنید، تعداد 0 به معنی نامحدود است",
      input: FormNumberInput(
        form,
        setForm,
        "studentCount",
        "تعداد",
        0,
        null,
        () => form.studentCount >= "0"
      ),
      size: 4,
    },
    {
      name: "قیمت آزمون",
      text: "قیمت این آزمون کامل را به ریال وارد کنید، اگر 0 وارد شود رایگان محصوب شده یا با قسمت محصول دیگری حساب میشود",
      input: FormNumberInput(
        form,
        setForm,
        "price",
        "قیمت به ریال",
        0,
        null,
        () => form.price >= "0"
      ),
      size: 4,
    },
    {
      name: "زمان شروع آزمون",
      text: "تاریخ و ساعت شروع آزمون را وارد کنید",
      input: (
        <DateTimePickerToGeorgian
          className="form-control"
          name="startDate"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e })}
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
          name="endDate"
          value={form.endDate}
          onChange={(e) => {
            setForm({ ...form, endDate: e });
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
          name="resultDate"
          value={form.resultDate}
          onChange={(e) => setForm({ ...form, resultDate: e })}
        />
      ),
      size: 4,
    },
    {
      name: "نمایش کارنامه بعد آزمون",
      text: "به محض اتمام آزمون، کارنامه به دانش آموز نمایش داده شود.",
      input: FormSwitchInput(
        form,
        setForm,
        "showResultImmediately",
        form.showResultImmediately
      ),
      size: 3,
    },
    {
      name: "حالت تست",
      text: "آزمون در حال ویرایش و تست میباشد و نباید منتشر شود.",
      input: FormSwitchInput(form, setForm, "isLock", form.isLock),
      size: 6,
    },
    {
      name: "آزمون به صورت pdf",
      text: "آزمون طرح شده در حالت pdf نیز قابل شرکت است.",
      input: FormSwitchInput(
        form,
        setForm,
        "questionFileReady",
        form.questionFileReady
      ),
      size: 3,
    },
    {
      name: "فایل پاسخ نامه",
      text: " فایل pdf پاسخ نامه موجود است.",
      input: FormSwitchInput(
        form,
        setForm,
        "answerFileReady",
        form.answerFileReady
      ),
      size: 3,
    },
  ];
};

const QuizModeSelect = ({ form, setForm }) => {
  return (
    <CCol sm="3">
      <CFormGroup>
        <CLabel htmlFor="nf-title">حالت برگزاری آزمون</CLabel>
        <CSelect
          onChange={(e) => {
            setForm({ ...form, quizMode: e.target.value });
          }}
        >
          {[
            { id: "2", name: "هردو" },
            { id: "0", name: "حالت pdf" },
            { id: "1", name: "حالت سوال به سوال" },
          ].map((item, index) => (
            <option
              key={index}
              value={item.id}
              selected={`${form.quizMode}` === item.id}
            >
              {item.name}
            </option>
          ))}
        </CSelect>
        <CFormText className="help-block">
          درصورت تمایل،حالت آزمون را انتخاب کنید
        </CFormText>
      </CFormGroup>
    </CCol>
  );
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
                checked={form?.groupCodes?.includes(+item.id)}
                onChange={(e) => {
                  let arry = form.groupCodes;
                  e.target.checked
                    ? arry.push(+e.target.value)
                    : (arry = arry.filter((x) => x !== +e.target.value));
                  setForm({
                    ...form,
                    groupCodes: arry,
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

export { GroupIdSelect, QuizInfoFormItems, QuizModeSelect };
