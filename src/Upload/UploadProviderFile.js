
import { useState,useEffect } from "react";
import {
  UploadFileStatusMark,
  status,
} from "src/reusable/UploadFileStatusMark";
import {
  UploadFileRequest,
  GetFileDownloadLink,
} from "src/Service/APIEngine";
import {  PostData } from "src/Service/APIEngine";
const {
  CForm,
  CFormGroup,
  CInput,
  CSelect,
  CButton,
  CSpinner,
} = require("@coreui/react");

export const UploadProviderFile = () => {
  const [link, setLink] = useState("");
  const [btnActice, setBtnActive] = useState(false);

  const [statusFile, setStatusFile] = useState(2);

    const [providers, setProviders] = useState([]);
     useEffect(() => {
       PostData("Provider/Consultation", {}).then((res) => {
         setProviders(res.data);
       });
     }, []);
  const UploadFile = async (e) => {
    setStatusFile(status.LOADING);

    UploadFileRequest(e.target.files[0])
      .then((res) => {
        setLink(GetFileDownloadLink(res.data));

        setStatusFile(status.UPLOADED);
      })
      .catch(() => setStatusFile(status.FAILED));
  };
const handleSumbit = () => {
  setBtnActive(true);
  // PostData("Order/Change", {
  //   orderDetailId: form.orderDetailId,
  //   productProvider: {
  //     providerId: form.providerId,
  //     productId: form.productId,
  //     reserveDate: HejriToDotNetGeorgian(form.reserveDate),
  //   },
  //   description: form.description,
  // })
  //   .then(() => {
  //     setBtnActive(false);
  //     onSubmit();
  //   })
  //   .catch();
};

  return (
    <CForm inline>
      <CFormGroup className="w-40 m-2">
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
        <label className="p-1 mr-1  "> ارائه دهنده : </label>
        <CSelect
          //   value={}
          onChange={(e) => {}}
        >
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
  );
};
