import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import EditSubscriptions from "src/Webinar/EditSubscriptions/EditSubscriptions";
import { Toast } from "src/Utility/Toast";
import { useState } from "react";
const { CInput, CSwitch } = require("@coreui/react");
export const SubscriptionsScopedSlots = (
  setModalContent,
  setModal,
  modal,
  subscriptionId
) => {
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  return {
    webinarLink: (item, index) => (
      <>
        <td className="py-2 pl-2">
          <div style={{ width: 200 }}>
            {" "}
            <CInput disabled value={item.webinarLink} />
          </div>
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
                <EditSubscriptions
                  obj={item}
                  setModal={setModal}
                  subscriptionId={subscriptionId}
                /> //subscriptionId is missing
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
