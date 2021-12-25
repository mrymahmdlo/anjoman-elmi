
import { useState,useEffect } from "react";
import {
  UploadFileStatusMark,
  status,
} from "src/reusable/UploadFileStatusMark";
import {
  UploadFileRequest,
  GetFileDownloadLink,
} from "src/Service/APIEngine";
import { PostData, GetData } from "src/Service/APIEngine";
import {  GetDataProvider,PostDataProvider } from "src/Service/APIProvider";
import { Toast } from "src/Utility/Toast";
import { useHistory } from "react-router";

const {
  CForm,
  CFormGroup,
  CInput,
  CSelect,
  CButton,
  CSpinner,
  CFormText,
} = require("@coreui/react");

export const UploadProviderFile = () => {
  const [link, setLink] = useState("");
  const [btnActice, setBtnActive] = useState(false);
   const [activeProvider, setActiveProvider] = useState(false);
      const [activeContent, setActiveContent] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [statusFile, setStatusFile] = useState(2);
 const [showError, setShowError] = useState(false);
    const [providers, setProviders] = useState([]);
     const [providerId, setProviderId] = useState();
         const [contentType, setContentType] = useState([]);
         const [type, setType] = useState();
          const history = useHistory();
     useEffect(() => {
       setActiveProvider(true);
       PostData("Provider/Consultation", {}).then((res) => {
         setProviders(res.data);
         setActiveProvider(false);
       });
     }, []);
     useEffect(() => {
       setActiveContent(true);
       GetDataProvider("Content/ContentTypes").then((res) => {
         setContentType(res);
         setActiveContent(false);
       });
     }, []);

  const UploadFile = async (e) => {
    setStatusFile(status.LOADING);

    UploadFileRequest(e?.target.files[0])
      .then((res) => {
        setLink(GetFileDownloadLink(res.data));

        setStatusFile(status.UPLOADED);
      })
      .catch(() => setStatusFile(status.FAILED));
  };
const handleSumbit = () => {
  setBtnActive(true);
  PostDataProvider("Content/Upload", {
    contentType: Number(type),

    providerId: providerId,
    link: link,
  })
    .then(() => {
      setBtnActive(false);
       setShowError(true);
      setErrorContent("داده با موفقیت ثبت شد ");
      
    })
    .catch(() => {
      setErrorContent("خطا در ثبت ");
   setShowError(true);
      setBtnActive(false);
    });
};

  return (
    <div>
      <CForm inline>
        <CFormGroup className="w-30 m-2">
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
        <CFormGroup className="text-left w-40 m-2">
          <label className="p-1 mr-1  "> ارائه دهنده : </label>

          {!activeProvider ? (
            <CSelect
              //   value={}
              onChange={(e) => {
                setProviderId(e.target.value);
              }}
            >
              <option value={0}>پشتیبان را انتخاب کنید</option>
              {providers.length > 0 ? (
                providers.map((item) => (
                  <option value={item.providerId} key={item.providerId}>
                    {item.name + " " + item.lastName}{" "}
                  </option>
                ))
              ) : (
                <option>پشتیبانی وجود ندارد</option>
              )}
            </CSelect>
          ) : (
            <CSpinner
              style={{ width: "4rem", height: "4rem" }}
              color="danger"
              variant="grow"
            />
          )}
        </CFormGroup>

        <CFormGroup className="text-left w-30 m-2">
          <label htmlFor="nf-title" style={{padding:5}}>   نوع   :  </label>

           {!activeContent ? (
             <CSelect
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value={0}>نوع را انتخاب کنید</option>
              {contentType.length > 0 ? (
                contentType.map((item, index) => (
                  <option key={index} value={item.id} selected={item.id}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option> وجود ندارد</option>
              )}
            </CSelect>
          ) : (
            <CSpinner
              style={{ width: "4rem", height: "4rem" }}
              color="danger"
              variant="grow"
            />
          )}
        </CFormGroup>

        <CFormGroup
          display="grid"
          style={{ display: "grid", placeItems: "center", witdh: "100%" }}
          className=" m-2"
        >
          {!btnActice ? (
            <CButton
              color={"primary"}
              onClick={handleSumbit}
              disabled={btnActice}
            >
              ثبت
            </CButton>
          ) : (
            <CSpinner
              style={{ width: "4rem", height: "4rem" }}
              color="danger"
              variant="grow"
            />
          )}
        </CFormGroup>
      </CForm>
      <Toast showError={showError} errorContent={errorContent} />
    </div>
  );
};
