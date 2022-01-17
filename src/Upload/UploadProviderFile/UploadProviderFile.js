import { useState, useEffect } from "react";
import React, { Component } from "react";
import Select from "react-select";
import {
  UploadFileStatusMark,
  status,
} from "src/reusable/UploadFileStatusMark";
import { UploadFileRequest, GetFileDownloadLink } from "src/Service/APIEngine";
import { PostData } from "src/Service/APIEngine";
import { GetDataProvider, PostDataProvider } from "src/Service/APIProvider";
import { Toast } from "src/Utility/Toast";

const {
  CForm,
  CFormGroup,
  CInput,
  CSelect,
  CButton,
  CSpinner,
} = require("@coreui/react");

export const UploadProviderFile = () => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 35,
      width: 200,
      minHeight: 35,
    }),
    option: (provided) => ({
      ...provided,
      textAlign: "right",
    }),
  };

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
      if (type === "0") {
        setActiveProvider(true);
        PostData("Provider/Tutoring", {}).then((res) => {
          setProviders(res.data);
          setActiveProvider(false);
        });
      } else {
        setActiveProvider(true);
        PostData("Provider/Consultation", {}).then((res) => {
          setProviders(res.data);
          setActiveProvider(false);
        });
      }
    });
  }, [type]);

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
    setShowError(false);
    PostDataProvider("Content/Upload", {
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
  console.log(providers);

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
                console.log(e.target.value);
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
              <Select
                options={providers.map((opt) => ({
                  label: opt.name + " " + opt.lastName,
                  value: opt.name + " " + opt.lastName,
                }))}
                styles={customStyles}
                onChange={(e) =>
                  e.target.value === "0"
                    ? setProviderId(null)
                    : setProviderId(e.target.value)
                }
              />
            ) : (
              <CSpinner color="danger" variant="grow" />
            )}
          </CFormGroup>
        ) : null}
        {type == "2" ? (
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
