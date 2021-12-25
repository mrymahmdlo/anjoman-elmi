import React from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

const Dashboard = () => {
  return (
    <>
    <CCard>
        <CCardBody>
          <CRow>
            <CCol >
              <h4 id="traffic" className="card-title mb-0">
                آپدیت
              </h4>
              <p className="small text-muted" >
                پنل بارگزاری فایل مشاوره اضافه شد.
              </p>
              <div className="">
               برای بارگزاری فایل مشاوره ابتدا از منوی سمت راست قسمت "بارگزاری فایل ها " را انتخاب کنید.در قسمت "بارگزاری فایل  مشاوره" میتوانید بارگزاری را انجام دهید . 
  
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard></CCard>
     <CCard>
        <CCardBody>
          <CRow>
            <CCol >
              <h4 id="traffic" className="card-title mb-0">
                آپدیت
              </h4>
              <p className="small text-muted" >
                پنل ثبت محتوای عمومی اضافه شد.
              </p>
              <div className="">
               برای افزودن محتوا ابتدا از منوی سمت راست قسمت "محتواهای متنی" را انتخاب کنید.در قسمت "مدیریت محتواهای متنی" میتوانید محتواهای پیشین سایت را ویرایش یا حذف کنید .همچنین 
               برای افزودن محتوای جدید ابتدا به قسمت "ایجاد محتوای جدید" بروید و با وارد کردن نام محتوا و نویسنده و اطلاعات داده شده ، پس از بررسی صحت داده ها، محتوا را ثبت کنید.
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
            <CCol >
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
