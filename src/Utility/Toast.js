import { CToast, CToastBody, CToaster, CToastHeader } from "@coreui/react";
import React from "react";

export const Toast = ({ showError, errorContent }) => {
  return (
    <CToaster position={"bottom-left"} key={"toaster"}>
      <CToast key={"toast"} show={showError} autohide={2000} fade={true}>
        <CToastHeader closeButton={true}>سامانه مدیریت</CToastHeader>
        <CToastBody>{errorContent}</CToastBody>
      </CToast>
    </CToaster>
  );
};
