import CIcon from "@coreui/icons-react";
import { useState } from "react";
import {
  UploadFileStatusMark,
  status,
} from "src/reusable/UploadFileStatusMark";
import { UploadFileRequest, GetFileDownloadLink } from "src/Service/APIEngine";

const {
  CForm,
  CFormGroup,
  CInput,
  CButton,
  CTooltip,
} = require("@coreui/react");

export const UploadFile = () => {
  const [link, setLink] = useState("");
  const [statusFile, setStatusFile] = useState(2);
  const [copyText, setCopyText] = useState("کپی");
  const UploadFile = async (e) => {
    setStatusFile(status.LOADING);
    UploadFileRequest(e.target.files[0])
      .then((res) => {
        GetFileDownloadLink(res.data).then((data) => {
          let linkSource = `data:application/${
            e.target.files[0].name.split(".")[1]
          };base64,${data.data.fileBytes}`;
          setLink(linkSource);
        });
        setStatusFile(status.UPLOADED);
      })
      .catch(() => setStatusFile(status.FAILED));
  };
  const copyInput = () => {
    navigator.clipboard.writeText(link);
    setCopyText("ذخیره شد!");
    setTimeout(() => {
      setCopyText("کپی");
    }, 5000);
  };

  return (
    <CForm inline style={{ flexFlow: "row" }}>
      <CFormGroup className="w-50">
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
        <CInput className="w-75" type="text" value={link} disabled />
        <CButton onClick={copyInput}>
          <CTooltip content={copyText} placement="left">
            <CIcon
              name="cil-cloud-download"
              style={{ width: "1.7rem", height: "2rem" }}
            />
          </CTooltip>
        </CButton>
        {statusFile === status.UPLOADED ? (
          <a href={link} target="_blank" rel="noreferrer">
            <CButton>
              <CTooltip content={"دانلود"} placement="left">
                <CIcon
                  name="cil-laptop"
                  style={{ width: "1.7rem", height: "2rem" }}
                />
              </CTooltip>
            </CButton>
          </a>
        ) : null}
      </CFormGroup>
    </CForm>
  );
};
