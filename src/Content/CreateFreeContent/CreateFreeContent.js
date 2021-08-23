import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

const CreateFreeContent = () => {
  return (
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" className="card-title mb-0">
              محتوای عمومی
            </h4>
            <div className="small text-muted">درحال ساخت</div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default CreateFreeContent;
