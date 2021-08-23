import { CToast, CToastBody, CToaster, CToastHeader } from "@coreui/react";

export const Toast = ({ showError, errorContent }) => {
  return (
    <CToaster position={"bottom-left"} key={"toaster"}>
      <CToast key={"toast"} show={showError} autohide={3000} fade={true}>
        <CToastHeader closeButton={true}>سامانه مدیریت</CToastHeader>
        <CToastBody>{errorContent}</CToastBody>
      </CToast>
    </CToaster>
  );
};
