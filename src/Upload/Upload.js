import { UploadFile } from "./UploadFile";

const { CCard, CCardHeader, CCardBody } = require("@coreui/react");

const Upload = () => {
  return (
    <CCard>
      <CCardHeader> صفحه بارگزاری فایل ها </CCardHeader>
      <CCardBody>
        {[...Array(5)].map((i) => (
          <UploadFile />
        ))}
      </CCardBody>
    </CCard>
  );
};

export default Upload;
