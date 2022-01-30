import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import EditSubscriptions from "src/Webinar/EditSubscriptions/EditSubscriptions";
import { Toast } from "src/Utility/Toast";
import { useState } from "react";

export const SubscriptionsScopedSlots = (setModalContent, setModal, modal) => {
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  return {
    webinarLink: (item, index) => (
      <>
        <td className="py-2 pl-2">
          <CButton
            color="success"
            onClick={() => {
              navigator.permissions
                .query({ name: "clipboard-write" })
                .then((result) => {
                  if (result.state === "granted" || result.state === "prompt") {
                    navigator.clipboard
                      .writeText(item.webinarLink)
                      .then(() => {
                        setModalContent("success"); 
                      })
                      .catch(() => {
                        <Toast showError={showError} errorContent={errorContent} /> 
                      })
                      .finally(() => setModal(true));
                  } else {<Toast showError={showError} errorContent={errorContent} />} 
                });
            }}
            
          >
            کپی
          </CButton>
        </td>
      </>
    ),
    edit: (item, index) => (
      <>
        <td className="py-2 pl-2">
          <CButton
            color="primary"
            onClick={() => {
              setModalContent(
                <EditSubscriptions obj={item} setModal={setModal} /> //subscriptionId is missing
              );
              setModal(true);
            }}
          >
            <CIcon name="cil-pencil" />
          </CButton>
        </td>
      </>
    ),
  };
};
