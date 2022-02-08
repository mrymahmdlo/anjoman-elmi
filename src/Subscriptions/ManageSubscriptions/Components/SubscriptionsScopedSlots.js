import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import EditSubscriptions from "src/Subscriptions/EditSubscriptions/EditSubscriptions";

const { CInput } = require("@coreui/react");
export const SubscriptionsScopedSlots = (
  setModalContent,
  setModal,
  subscriptionId
) => {
  return {
    webinarLink: (item) => (
      <>
        <td className="py-2 pl-2">
          <div style={{ width: 200 }}>
            {" "}
            <CInput disabled value={item.webinarLink} />
          </div>
        </td>
      </>
    ),
    edit: (item) => (
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
                />
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
