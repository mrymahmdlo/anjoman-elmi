import {
  CButton,
  CProgress,
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from "@coreui/react";
import { useState } from "react";
import { PostData } from "src/service/APIConfig";
import { Activity } from "../ModalContent/Activity";
import { EditForm } from "../ModalContent/EditForm";

export const ScopedSlots = (setModal, modal, setModalContent) => {
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
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
          <td className="py-2 pl-2" key={item.orderId}>
            <CButton
              onClick={() => {
                setModal(!modal);
                setModalContent(<Activity item={item} />);
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
          <td className="py-2 pl-2" key={item.orderId}>
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
    smsSender: (item, index) => {
      return (
        <>
          <td className="py-2 pl-2" key={item.orderId}>
            <CButton
              onClick={() => {
                setShowError(false);
                PostData(
                  "ConsultationActivity/Resend/" + item.orderDetailId,
                  {}
                )
                  .then((res) => {
                    setShowError(true);
                    setErrorContent("ارسال یادآور با موفقیت انجام شد");
                    return res;
                  })
                  .catch((err) => {
                    setShowError(true);
                    setErrorContent("ارسال یادآور با مشکل مواجه شد");
                  });
              }}
              className="mr-1 btn btn-success"
            >
              یادآور
            </CButton>
            <CToaster position={"bottom-left"} key={"toaster"}>
              <CToast
                key={"toast"}
                show={showError}
                autohide={3000}
                fade={true}
              >
                <CToastHeader closeButton={true}>خطا در ورود</CToastHeader>
                <CToastBody>{errorContent}</CToastBody>
              </CToast>
            </CToaster>
          </td>
        </>
      );
    },
  };
};
