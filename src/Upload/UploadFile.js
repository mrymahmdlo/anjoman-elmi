import { useState } from "react";
import {
  UploadFileStatusMark,
  status,
} from "src/reusable/UploadFileStatusMark";
import { APICoreUpload, APICoreFileLink } from "src/Service/APIBase";
import React from "react";
import { copyToClipboard } from "src/Utility/CopyToClipboard";
// todo
import { CForm, CFormGroup, CInput, CButton } from "@coreui/react";

export const UploadFile = () => {
  const [link, setLink] = useState("");
  const [statusFile, setStatusFile] = useState(2);
  const UploadFile = async (e) => {
    setStatusFile(status.LOADING);
    APICoreUpload(e.target.files[0])
      .then((res) => {
        setLink(APICoreFileLink(res.data));
        setStatusFile(status.UPLOADED);
      })
      .catch(() => setStatusFile(status.FAILED));
  };

  return (
    <CForm inline style={{ flexFlow: "row" }}>
      <CFormGroup className="w-50 m-2">
        {UploadFileStatusMark(statusFile)}
        <CInput
          type="file"
          className="p-1 mr-1 w-75 "
          onChange={(e) => {
            UploadFile(e);
          }}
          disabled={statusFile === status.LOADING}
        />
      </CFormGroup>
      <CFormGroup className="text-left w-50">
        <CInput
          className="w-75"
          type="text"
          id="textLinkDownload"
          value={link}
          disabled
        />
        {statusFile === status.UPLOADED ? (
          <CButton
            className="m-1"
            onClick={() => copyToClipboard(link)}
            color="primary"
            data-clipboard-target="#textLinkDownload"
          >
            کپی کردن لینک
          </CButton>
        ) : null}
      </CFormGroup>
    </CForm>
  );
};
