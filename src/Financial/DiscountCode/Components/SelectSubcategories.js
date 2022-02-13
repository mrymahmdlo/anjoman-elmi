import {
  CCol,
  CFormGroup,
  CFormText,
  CInputCheckbox,
  CLabel,
} from "@coreui/react";

export const ProductSubCategories = [
  "MonthlyConsultation",
  "MinuteConsultation",
  "OfflineMinuteConsultation",
  "Webinar",
  "Teaching",
  "CourseContent",
  "ConsultationContent",
  "Quiz",
  "CourseQuiz",
  "OnlineTutoring",
  "OfflineTutoring",
];

const SubCategories = [
  "مشاوره ماهانه",
  " مشاوره دقیقه ای آنلاین",
  "مشاوره دقیقه ای آفلاین",
  "همایش",
  "کلاس رفع اشکال",
  "محتوای درسی",
  "محتوای مشاوره ای",
  "آزمون",
  "آزمون درس محور",
  "تدریس خصوصی آنلاین",
  "تدریس خصوصی آفلاین",
];

export const SelectCategories = ({ form, setForm }) => {
  return (
    <CFormGroup>
      <CCol>
        <CLabel htmlFor="nf-title">محصول هدف </CLabel>
        <CCol>
          {SubCategories.map((item, key) => (
            <>
              <CFormGroup key={key} variant="checkbox" className="checkbox">
                <label>
                  <CInputCheckbox
                    style={{ cursor: "pointer" }}
                    id={"checkbox-" + key}
                    value={key}
                    checked={form.subCategories.includes(+key)}
                    onChange={(e) => {
                      let arry = form.subCategories;
                      e.target.checked
                        ? arry.push(+e.target.value)
                        : (arry = arry.filter((x) => x !== +e.target.value));
                      setForm({
                        ...form,
                        subCategories: arry,
                      });
                    }}
                  />
                  <span
                    style={{ cursor: "pointer" }}
                    className="fa-clinic-medical"
                  >
                    {item}
                  </span>
                </label>
              </CFormGroup>
            </>
          ))}
        </CCol>
      </CCol>
      <CFormText className="help-block">
        {" "}
        محصولاتی که میخواهید کد تخفیف برای آنها اعمال شود را انتخاب کنید
      </CFormText>
    </CFormGroup>
  );
};
