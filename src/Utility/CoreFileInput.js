import {
  CCol,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import { useState } from "react";
import { UploadFileStatusMark, status } from "../reusable/UploadFileStatusMark";
import { APICoreUpload } from "src/Service/APIBase";
import React from "react";

const UploadFile = async (file, setStatusFile, setHashId) => {
  setStatusFile(status.LOADING);
  await APICoreUpload(file)
    .then((res) => {
      setHashId(res.data);
      setStatusFile(status.UPLOADED);
    })
    .catch(() => setStatusFile(status.FAILED));
};

export const CoreFileInput = ({ title, setHashId, type, preData }) => {
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
        {preData ? (
          <CFormText className="help-block">
            برای دیدن فایل آپلود شده
            <a href={preData} target="_blank" rel="noreferrer">
              {" "}
              کلیک کنید
            </a>
          </CFormText>
        ) : (
          <CFormText className="help-block">فایل را آپلود کنید</CFormText>
        )}
      </CFormGroup>
    </CCol>
  );
};
