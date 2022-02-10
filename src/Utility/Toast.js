import { CToast, CToastBody, CToaster, CToastHeader } from "@coreui/react";

export const Toast = ({ showError, showContent }) => {
  console.log(showError)
  return (
    <CToaster position={"bottom-left"} key={"toaster"}>
      <CToast key={"toast"} show={showError} autohide={3000} fade={true}>
        <CToastHeader closeButton={true}>سامانه مدیریت</CToastHeader>
        <CToastBody>{showContent}</CToastBody>
      </CToast>
    </CToaster>
  );
};
