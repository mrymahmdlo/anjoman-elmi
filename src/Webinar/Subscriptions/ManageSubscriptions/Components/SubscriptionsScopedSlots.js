import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import EditSubscriptions from "src/Webinar/Subscriptions/EditSubscriptions/EditSubscriptions";
import * as React from "react";
import {copyToClipboard} from "src/Utility/CopyToClipboard";
import {freeSet} from "@coreui/icons";

export const SubscriptionsScopedSlots = (
  setModalContent,
  setModal,
  subscriptionId
) => {
  return {
    webinarLink: (item) => (
      <>
        <td className="py-2 pl-2">
          <CButton
            className="m-1"
            onClick={() => copyToClipboard(item.webinarLink)}
            color="primary"
            title='کپی کردن لینک'
          >
            <CIcon content={freeSet.cilLink} />
          </CButton>
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
