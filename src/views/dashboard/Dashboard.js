import React from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

const Dashboard = () => {
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">
                آپدیت
              </h4>
              <p className="small text-muted">پنل ایجاد کد تخفیف اضافه شد.</p>
              <div className="">
                برای ایجاد کد تخفیف برای محصولات برترها، از منوی مقابل قسمت
                ایجاد کد تخفیف را کلیک کنید و با وارد کردن اطلاعات کد تخفیف را
                بسازید
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">
                آپدیت
              </h4>
              <p className="small text-muted">پنل زمان بندی مشاور اضافه شد.</p>
              <div className="">
                برای ایجاد زمان بندی جدید از منوی سمت راست قسمت "پنل زمان بندی
                مشاور" را انتخاب کنید سپس قسمت "ایجاد زمان بندی" را انتخاب کنید.
              </div>
              <div className="">
                برای مدیریت زمان بندی ها از منوی سمت راست قسمت "پنل زمان بندی
                مشاور" را انتخاب کنید سپس قسمت "مدیریت زمان بندی" را انتخاب
                کنید.
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">
                آپدیت
              </h4>
              <p className="small text-muted">پنل تدریس خصوصی اضافه شد.</p>
              <div className="">
                برای مدیریت و ایجاد تدریس خصوصی ابتدا از منوی سمت راست قسمت
                "تدریس خصوصی" را انتخاب کنید سپس قسمت های "مدیریت تدریس خصوصی" و
                "ایجاد تدریس خصوصی" را انتخاب کنید.
              </div>
              <div className="">
                برای مدیریت و ایجاد درس مشاور ابتدا از منوی سمت راست قسمت "تدریس
                خصوصی" را انتخاب کنید سپس قسمت های "مدیریت درس مشاور" و "ایجاد
                درس مشاور" را انتخاب کنید.
              </div>
              <div className="">
                برای دسترسی به پیامک های ارسالی ابتدا از منوی سمت راست قسمت
                "تدریس خصوصی" را انتخاب کنید سپس قسمت "پیامک های ارسالی" را
                انتخاب کنید.
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">
                آپدیت
              </h4>
              <p className="small text-muted">
                پنل بارگزاری فایل مشاوره اضافه شد.
              </p>
              <div className="">
                برای بارگزاری فایل مشاوره ابتدا از منوی سمت راست قسمت "بارگزاری
                فایل ها " را انتخاب کنید.در قسمت "بارگزاری فایل مشاوره" میتوانید
                بارگزاری را انجام دهید .
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">
                آپدیت
              </h4>
              <p className="small text-muted">پنل ثبت محتوای عمومی اضافه شد.</p>
              <div className="">
                برای افزودن محتوا ابتدا از منوی سمت راست قسمت "محتواهای متنی" را
                انتخاب کنید.در قسمت "مدیریت محتواهای متنی" میتوانید محتواهای
                پیشین سایت را ویرایش یا حذف کنید .همچنین برای افزودن محتوای جدید
                ابتدا به قسمت "ایجاد محتوای جدید" بروید و با وارد کردن نام محتوا
                و نویسنده و اطلاعات داده شده ، پس از بررسی صحت داده ها، محتوا را
                ثبت کنید.
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">
                آپدیت
              </h4>
              <div className="small text-muted">
                پنل مدیریت تماس های تلفنی اضافه شد
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">
                آپدیت
              </h4>
              <div className="small text-muted">
                پنل مدیریت آزمون ها و قابلیت افزودن آزمون اضافه شد
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
