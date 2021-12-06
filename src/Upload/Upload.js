import { UploadFile } from "./UploadFile";

const { CCard, CCardHeader, CCardBody, CCardSubtitle } = require("@coreui/react");

const Upload = () => {
  return (
    <CCard>
      <CCardHeader> صفحه بارگزاری فایل ها </CCardHeader>
      <CCardBody>
       <CCardSubtitle className="p-3">
              برای بارگزاری فایل، ابتدا فایل مد نظر خود را در قسمت  "Choose File" انتخاب کنید ، سپس با زدن بر روی دکمه 
              "کپی کردن لینک"  
              لینک دانلود را دریافت و در محل مورد نظر استفاده کنید.
              توجه شود دکمه کپی کردن لینک پس از موفقیت آمیز بودن آپلود ظاهر میشود.
       </CCardSubtitle>
        {[...Array(10)].map((i) => (
            <UploadFile />
        ))}
      </CCardBody>
    </CCard>
  );
};

export default Upload;
