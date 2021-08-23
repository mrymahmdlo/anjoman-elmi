import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

const CreateExam = () => {
  return (
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" className="card-title mb-0">
              آزمون
            </h4>
            <div className="small text-muted">درحال ساخت</div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default CreateExam;
