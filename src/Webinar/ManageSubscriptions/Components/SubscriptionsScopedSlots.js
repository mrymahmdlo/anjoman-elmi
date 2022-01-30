import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import EditSubscriptions from "src/Webinar/EditSubscriptions/EditSubscriptions";

export const SubscriptionsScopedSlots = (setModalContent, setModal, modal) => {
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
                        setModalContent("success"); //replace with toast -> persian
                      })
                      .catch(() => {
                        setModalContent("Failed to copy"); //replace with toast -> persian
                      })
                      .finally(() => setModal(true)); //replace with toast
                  } else console.log("failed"); //replace with toast -> persian
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
