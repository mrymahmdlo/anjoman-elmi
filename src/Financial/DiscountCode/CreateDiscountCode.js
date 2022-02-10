import { CCard, CCardBody, CCardHeader, CContainer } from "@coreui/react";
import CreateCodeForm from "./Components/CreateCodeForm";

const CreateDiscountCode = () => {
  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>ایجاد کد تخفیف محصولات</CCardHeader>
          <CCardBody>
            <CreateCodeForm />
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  );
};

export default CreateDiscountCode;
