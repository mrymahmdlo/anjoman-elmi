import CIcon from "@coreui/icons-react";
import { useState } from "react";
import {
  UploadFileStatusMark,
  status,
} from "src/reusable/UploadFileStatusMark";
import {
  UploadFileRequest,
  GetFileDownload,
  GetFileDownloadLink,
} from "src/Service/APIEngine";

const {
  CForm,
  CFormGroup,
  CInput,
  CButton,
  CTooltip,
} = require("@coreui/react");

export const UploadFile = () => {
  const [link, setLink] = useState("");
  const [fileName, setFileName] = useState();
  const [data, setData] = useState();
  const [statusFile, setStatusFile] = useState(2);
  const [copyText, setCopyText] = useState("کپی");
  const UploadFile = async (e) => {
    setStatusFile(status.LOADING);
     setFileName(e.target.files[0]);
    UploadFileRequest(e.target.files[0])
      .then((res) => {
         setLink(GetFileDownloadLink(res.data));


        setStatusFile(status.UPLOADED);
      })
      .catch(() => setStatusFile(status.FAILED));
  };
  // const copyInput = () => {
  //   navigator.clipboard.writeText(link);
  // };

  const copyToClipboard = () => {

    navigator.permissions.query({name: "clipboard-write"}).then(result => {
      if (result.state === "granted" || result.state === "prompt") {
        // write to the clipboard now
        updateClipboard(link);
      }
    });
  };

  console.log('pub1')

  const updateClipboard = (newClip) => {
    console.log('be')
    navigator.clipboard.writeText(newClip).then(() => {
      // clipboard successfully set
      console.log('success');
    })
      .catch(() => {
        // clipboard write failed
        console.log('Failed to copy');
      })
    console.log('af')
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
        <CInput className="w-75" type="text" id="textLinkDownload" value={link} disabled />
        {statusFile === status.UPLOADED ? (
          <CButton className="m-1" onClick={copyToClipboard} color="primary" data-clipboard-target="#textLinkDownload">
            کپی کردن لینک
        </CButton>
        ) : null}
      </CFormGroup>
    </CForm>
  );
};
