const {
  CInput,
  CCol,
  CFormGroup,
  CLabel,
  CInputCheckbox,
  CSwitch,
} = require("@coreui/react");

const InfoFormItems = (form, setForm) => {
  return [
    {
      name: "نام آزمون",
      text: "نام آزمون را وارد کنید",
      input: (
        <CInput
          type="text"
          name="QuizTitle"
          placeholder="عنوان"
          onChange={(e) => setForm({ ...form, QuizTitle: e.target.value })}
        />
      ),
      size: 4,
    },
    {
      name: "تعداد کل سوالات آزمون",
      text: "مجموع تعداد سوالات آزمون را وارد کنید",
      input: (
        <input
          className="form-control"
          type="number"
          name="QuestionCount"
          min={0}
          placeholder="تعداد"
          onChange={(e) => setForm({ ...form, QuestionCount: e.target.value })}
        />
      ),
      size: 4,
    },
    {
      name: "زمان کل آزمون",
      text: "مجموع زمان پاسخ دهی به آزمون را وارد کنید",
      input: (
        <input
          className="form-control"
          type="number"
          name="TotalTimeMinutes"
          min={0}
          placeholder="زمان به دقیقه"
          onChange={(e) =>
            setForm({ ...form, TotalTimeMinutes: e.target.value })
          }
        />
      ),
      size: 4,
    },
    {
      name: "تعداد شرکت کننده",
      text: "تعداد شرکت کننده را وارد کنید، تعداد 0 به معنی نامحدود است",
      input: (
        <CInput
          className="form-control"
          type="number"
          name="StudentCount"
          placeholder="تعداد (0  = نامحدود)"
          min={0}
          onChange={(e) =>
            e.target.value >= 0
              ? setForm({ ...form, StudentCount: e.target.value })
              : null
          }
        />
      ),
      size: 4,
    },
    {
      name: "قیمت آزمون",
      text: "قیمت این آزمون کامل را به ریال وارد کنید، اگر 0 وارد شود رایگان محصوب شده یا با قسمت محصول دیگری حساب میشود",
      input: (
        <CInput
          className="form-control"
          type="number"
          name="Price"
          placeholder="قیمت به ریال"
          min={0}
          onChange={(e) =>
            e.target.value >= 0
              ? setForm({ ...form, Price: e.target.value })
              : null
          }
        />
      ),
      size: 4,
    },
    {
      name: "زمان شروع آزمون",
      text: "تاریخ(به میلادی) و ساعت شروع آزمون را وارد کنید",
      input: (
        <CInput
          className="form-control"
          type="datetime-local"
          name="StartDate"
          placeholder="تاریخ و ساعت شروع آزمون"
          onChange={(e) => setForm({ ...form, StartDate: e.target.value })}
        />
      ),
      size: 4,
    },
    {
      name: "زمان اتمام آزمون",
      text: "تاریخ(به میلادی) و ساعت تمام شدن آزمون را وارد کنید",
      input: (
        <CInput
          className="form-control"
          type="datetime-local"
          name="EndDate"
          placeholder="تاریخ(به میلادی) و ساعت اتمام آزمون"
          onChange={(e) => setForm({ ...form, EndDate: e.target.value })}
        />
      ),
      size: 4,
    },
    {
      name: "زمان دسترسی به کارنامه آزمون",
      text: "تاریخ و ساعت دسترسی به کارنامه شخصی دانش آموز را وارد کنید",
      input: (
        <CInput
          className="form-control"
          type="datetime-local"
          name="ResultDate"
          placeholder="تاریخ و ساعت شروع آزمون"
          onChange={(e) => setForm({ ...form, ResultDate: e.target.value })}
        />
      ),
      size: 4,
    },
    {
      name: "نمایش کارنامه بعد آزمون",
      text: "به محض اتمام آزمون، کارنامه به دانش آموز نمایش داده شود.",
      input: (
        <CSwitch
          className="mr-1"
          name="ShowResultImmediately"
          color="primary"
          onChange={(e) =>
            setForm({
              ...form,
              ShowResultImmediately: e.target.value,
            })
          }
          defaultChecked
        />
      ),
      size: 3,
    },
    {
      name: "انتشار آزمون",
      text: "سوالات آزمون ثبت شده و آماده شرکت کردن می باشد.",
      input: (
        <CSwitch
          className="mr-1"
          name="IsValid"
          color="primary"
          onChange={(e) =>
            setForm({
              ...form,
              IsValid: e.target.value,
            })
          }
        />
      ),
      size: 3,
    },
    {
      name: "آزمون به صورت pdf",
      text: "آزمون طرح شده در حالت pdf نیز قابل شرکت است.",
      input: (
        <CSwitch
          className="mr-1"
          name="QuestionFileReady"
          color="primary"
          onChange={(e) =>
            setForm({
              ...form,
              QuestionFileReady: e.target.value,
            })
          }
        />
      ),
      size: 3,
    },
    {
        name: "فایل پاسخ نامه",
        text: " فایل pdf پاسخ نامه موجود است.",
        input: (
            <CSwitch
            className="mr-1"
            name="AnswerFileReady"
            color="primary"
            onChange={(e) =>
              setForm({
                ...form,
                QuestionFileReady: e.target.value,
              })
            }
          />
        ),
        size: 3,
      },
  ];
};

const GroupIdSelect = (groupIds) => {
  return (
    <CCol sm="4">
      <CFormGroup>
        <CLabel htmlFor="nf-title">گروه آزمایشی آزمون را مشخص کنید</CLabel>
        {groupIds.map((item, key) => (
          <>
            <CFormGroup variant="checkbox" className="checkbox">
              <CInputCheckbox id="checkbox1" name="checkbox1" value={item.id} />
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
      </CFormGroup>
    </CCol>
  );
};

export { GroupIdSelect, InfoFormItems };
