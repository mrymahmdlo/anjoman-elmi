import { CButton, CProgress } from "@coreui/react";
import { Activity } from "../ModalContent/Activity";
import { EditForm } from "../ModalContent/EditForm";

export const ScopedSlots = (setModal, modal, setModalContent) => {
  return {
    progressPercent: (item) => {
      return (
        <td className="py-2 pl-2">
          <CProgress
            showPercentage
            value={item.progressPercent}
            className="bg-dark mt-2"
            color={
              item.progressPercent < 40
                ? "danger"
                : item.progressPercent < 70
                ? "warning"
                : "success"
            }
            animated
          />
        </td>
      );
    },
    orderDetail: (item, index) => {
      return (
        <>
          <td className="py-2 pl-2">
            <CButton
              onClick={() => {
                setModal(!modal);
                setModalContent(Activity(item));
              }}
              className="mr-1"
              color="danger"
            >
              پیگیری
            </CButton>
          </td>
        </>
      );
    },
    orderEdit: (item, index) => {
      return (
        <>
          <td className="py-2 pl-2">
            <CButton
              onClick={() => {
                setModal(!modal);
                setModalContent(
                  <EditForm
                    orderDetailId={item.orderDetailId}
                    onSubmit={() => setModal(false)}
                  />
                );
              }}
              className="mr-1"
              color="primary"
            >
              ویرایش
            </CButton>
          </td>
        </>
      );
    },
  };
};
