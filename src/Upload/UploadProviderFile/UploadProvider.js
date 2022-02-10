import { UploadProviderFile } from "./UploadProviderFile";
import React from "react";
// todo
// change it to import
const {
  CCard,
  CCardHeader,
  CCardBody,
  CCardSubtitle,
  
} = require("@coreui/react");

const UploadProvider = () => {
  return (
    <CCard>
      <CCardHeader> صفحه بارگزاری فایل ها ی مشاوره</CCardHeader>
      <CCardBody>
        <CCardSubtitle className="p-3">
          برای بارگزاری فایل، ابتدا فایل مد نظر خود را در قسمت "Choose File"
          انتخاب کنید ، سپس در قسمت نوع ،نوع فایل و در قسمت ارائه دهنده  ،پشتیبان
           را انتخاب کرده و در انتها دکمه ثبت را بزنید.{" "}
        </CCardSubtitle>

        <UploadProviderFile />
      </CCardBody>
    </CCard>
  );
};

export default UploadProvider;
