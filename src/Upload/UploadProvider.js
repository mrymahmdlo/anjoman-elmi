import { UploadProviderFile } from "./UploadProviderFile";

const {
  CCard,
  CCardHeader,
  CCardBody,
  CCardSubtitle,
  
} = require("@coreui/react");

const UploadProvider = () => {
  return (
    <CCard>
      <CCardHeader> صفحه بارگزاری فایل ها مشاور</CCardHeader>
      <CCardBody>
        <CCardSubtitle className="p-3">
          برای بارگزاری فایل، ابتدا فایل مد نظر خود را در قسمت "Choose File"
          انتخاب کنید ، سپس  در قسمت ارائه دهنده مشاور را انتخاب کرده و در انتها دکمه ثبت را بزنید.        </CCardSubtitle>
  
          <UploadProviderFile />
       
      </CCardBody>
    </CCard>
  );
};

export default UploadProvider;
