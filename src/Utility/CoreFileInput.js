import {
  CCol,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import { useState } from "react";
import { UploadFileStatusMark,status} from '../reusable/UploadFileStatusMark';
import { UploadFileRequest } from "src/Service/APIEngine";


const UploadFile = async (file, setStatusFile, setHashId) => {
  setStatusFile(status.LOADING);
  await UploadFileRequest(file)
    .then((res) => {setHashId(res.data);setStatusFile(status.UPLOADED);})
    .catch(() => setStatusFile(status.FAILED));
};

export const CoreFileInput = ({ title, setHashId, type }) => {
  const [statusFile, setStatusFile] = useState(2);
  return (
    <CCol>
      <CFormGroup>
        <CRow>
          <CLabel>{title}</CLabel>
        </CRow>
        <CRow>
          {UploadFileStatusMark(statusFile)}
          <CInput
            id="file-questions"
            type="file"
            className="p-1 mr-2 w-75"
            onChange={(e) => {
              UploadFile(e.target.files[0], setStatusFile, setHashId);
            }}
            accept={type}
            disabled={statusFile === status.LOADING}
          />
        </CRow>
        <CFormText className="help-block">فایل را آپلود کنید</CFormText>
      </CFormGroup>
    </CCol>
  );
};
