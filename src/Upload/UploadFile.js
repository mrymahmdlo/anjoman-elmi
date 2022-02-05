import {useState} from "react";
import {
  UploadFileStatusMark,
  status,
} from "src/reusable/UploadFileStatusMark";
import {
  UploadFileRequest,
  GetFileDownloadLink,
} from "src/Service/APIEngine";

const {
  CForm,
  CFormGroup,
  CInput,
  CButton,
} = require("@coreui/react");

export const UploadFile = () => {
  const [link, setLink] = useState("");
  const [statusFile, setStatusFile] = useState(2);
  const UploadFile = async (e) => {
    setStatusFile(status.LOADING);
    UploadFileRequest(e.target.files[0])
      .then((res) => {
        setLink(GetFileDownloadLink(res.data));
        setStatusFile(status.UPLOADED);
      })
      .catch(() => setStatusFile(status.FAILED));
  };

  const copyToClipboard = () => {
    if (typeof (navigator.clipboard) == 'undefined') {
      console.log('navigator.clipboard is undefined');
      let textArea = document.createElement("textarea");
      textArea.value = link;
      textArea.style.position = "fixed";  //avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'successful' : 'unsuccessful';
        console.log(msg);
      } catch (err) {
        console.log('Was not possible to copy te text: ', err);
      }

      document.body.removeChild(textArea)
      return;
    }
    navigator.clipboard.writeText(link).then(
      function () {
        console.log(`successful!`);
      }, function (err) {
        console.log('unsuccessful!', err);
      });
    // navigator.permissions.query({name: "clipboard-write"}).then(result => {
    //   if (result.state === "granted" || result.state === "prompt") {
    //     updateClipboard(link);
    //   }
    //   else console.log('failed');
    // });
  };

  const updateClipboard = (newClip) => {
    navigator.clipboard.writeText(newClip).then(() => {
      console.log('success');
    })
      .catch(() => {
        console.log('Failed to copy');
      })
  };

  return (
    <CForm inline style={{flexFlow: "row"}}>
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
        <CInput className="w-75" type="text" id="textLinkDownload" value={link} disabled/>
        {statusFile === status.UPLOADED ? (
          <CButton className="m-1" onClick={copyToClipboard} color="primary" data-clipboard-target="#textLinkDownload">
            کپی کردن لینک
          </CButton>
        ) : null}
      </CFormGroup>
    </CForm>
  );
};
