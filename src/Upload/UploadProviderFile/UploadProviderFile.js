import { useState, useEffect } from "react";
import {
  UploadFileStatusMark,
  status,
} from "src/reusable/UploadFileStatusMark";
import { APICoreUpload, APICoreFileLink } from "src/Service/APIBase";
import { APICorePost } from "src/Service/APIBase";
import { APIProviderGet, APIProviderPost } from "src/Service/APIProvider";
import { Toast } from "src/Utility/Toast";
import React from "react";
// todo
import {
  CForm,
  CFormGroup,
  CInput,
  CSelect,
  CButton,
  CSpinner,
} from "@coreui/react";

export const UploadProviderFile = () => {
  const [link, setLink] = useState("");
  const [btnActice, setBtnActive] = useState(false);
  const [activeProvider, setActiveProvider] = useState(false);
  const [activeContent, setActiveContent] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [statusFile, setStatusFile] = useState(2);
  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState([]);
  const [providerId, setProviderId] = useState(-1);
  const [contentType, setContentType] = useState([]);
  const [valueNumber, setValueNumber] = useState([]);
  const [type, setType] = useState(-1);
  useEffect(() => {
    setActiveProvider(true);
    // todo
    // add service
    APICorePost("Provider/Consultation").then((res) => {
      setProviders(res.data);
      setActiveProvider(false);
    });
  }, []);
  useEffect(() => {
    setActiveContent(true);
    // todo
    // add service
    APIProviderGet("Content/ContentTypes").then((res) => {
      setContentType(res);
      setActiveContent(false);
      if (type === "0") {
        setActiveProvider(true);
        APICorePost("Provider/Tutoring").then((res) => {
          setProviders(res.data);
          setActiveProvider(false);
        });
      } else {
        setActiveProvider(true);
        APICorePost("Provider/Consultation").then((res) => {
          setProviders(res.data);
          setActiveProvider(false);
        });
      }
    });
  }, [type]);

  const UploadFile = async (e) => {
    setStatusFile(status.LOADING);
    APICoreUpload(e?.target.files[0])
      .then((res) => {
        setLink(APICoreFileLink(res.data));

        setStatusFile(status.UPLOADED);
      })
      .catch(() => setStatusFile(status.FAILED));
  };
  const handleSumbit = () => {
    setBtnActive(true);
    setShowError(false);
    APIProviderPost("Content/Upload", {
      contentType: Number(type),
      providerId: providerId,
      link: link.toString(),
    })
      .then(() => {
        setBtnActive(false);
        setShowError(true);
        setType(-1);
        setProviderId(-1);
        setStatusFile(status.EMPTY);
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
        <CFormGroup className="text-left w-30 m-2">
          <label htmlFor="nf-title" style={{ padding: 5 }}>
            {" "}
            نوع :{" "}
          </label>

          {!activeContent ? (
            <CSelect
              value={type}
              defaultValue={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value={-1}>نوع را انتخاب کنید</option>
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
        {type !== "" ? (
          <CFormGroup className="text-left w-40 m-2">
            <label className="p-1 mr-1  "> ارائه دهنده : </label>

            {!activeProvider ? (
              <CSelect
                value={providerId}
                defaultValue={providerId}
                onChange={(e) => {
                  setProviderId(e.target.value);
                }}
              >
                <option value={-1}>پشتیبان را انتخاب کنید</option>
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
        ) : null}
        {type === "2" ? (
          <CFormGroup className="text-left w-40 m-2">
            <label className="p-1 mr-1  "> شمارنده : </label>
            <CInput
              className="w-75"
              type="number"
              value={valueNumber}
              onChange={(e) => {
                setValueNumber(e.target.value);
                setLink(Number(e.target.value));
              }}
            />
          </CFormGroup>
        ) : (
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
        )}

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
