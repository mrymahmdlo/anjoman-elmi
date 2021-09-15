const {
  CCard,
  CCardBody,
  CRow,
  CButton,
  CCol,
  CFormGroup,
  CLabel,
  CFormText,
} = require("@coreui/react");

const AddFilesButtons = () => {
  return (
    <CCard className="m-2">
      <CCardBody>
        <CRow>
          <CCol sm={4}>
            <CFormGroup>
              <CRow>
                {" "}
                <CLabel htmlFor="nf-title">بارگزاری فایل سوالات آزمون</CLabel>
              </CRow>
              <CButton type="submit" size="md" color="primary" onClick={""}>
                انتخاب سوالات
              </CButton>
              <CFormText className="help-block">
                فایل تمام سوالات آزمون را یک جا به صورت pdf آپلود کنید
              </CFormText>
            </CFormGroup>
          </CCol>
          <CCol sm={4}>
            <CFormGroup>
              <CRow>
                {" "}
                <CLabel htmlFor="nf-title">
                  بارگزاری فایل پاسخ نامه آزمون
                </CLabel>
              </CRow>
              <CButton type="submit" size="md" color="primary" onClick={""}>
                انتخاب پاسخ نامه
              </CButton>
              <CFormText className="help-block">
                فایل آپلود شده : pasokh2.pdf
              </CFormText>
            </CFormGroup>
          </CCol>
          <CCol sm={4}>
            <CFormGroup>
              <CRow>
                {" "}
                <CLabel htmlFor="nf-title">
                  بارگزاری ویدیو حل سوالات آزمون
                </CLabel>
              </CRow>
              <CButton type="submit" size="md" color="primary" onClick={""}>
                انتخاب ویدیو
              </CButton>
              <CFormText className="help-block">
                ویدیو حل سوالات آزمون را اینجا آپلود کنید، محدودیت حجم؟ یا لینک؟
              </CFormText>
            </CFormGroup>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default AddFilesButtons;
