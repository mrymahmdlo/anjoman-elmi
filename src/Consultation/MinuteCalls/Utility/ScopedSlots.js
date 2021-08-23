import { CButton, CProgress } from "@coreui/react";
import { useState } from "react";
import { PostData } from "src/Service/APIConfig";
import { Toast } from "src/Utility/Toast";
import { Activity } from "../ModalContent/Activity";
import { EditForm } from "../ModalContent/EditForm";

export const ScopedSlots = (setModal, modal, setModalContent, updateData) => {
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
                    onSubmit={async() => {
                      setModal(false);
                      await updateData();
                      setShowError(true);
                      setErrorContent("جدول به روز رسانی شد");
                    }}
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
                    setErrorContent(res.data);
                    return res;
                  })
                  .catch((err) => {
                    setShowError(true);
                    setErrorContent(
                      "بدون ایجاد ویرایش، امکان ارسال یادآور ممکن نیست"
                    );
                  });
              }}
              className="mr-1 btn btn-success"
            >
              یادآور
            </CButton>
            <Toast showError={showError} errorContent={errorContent} />
          </td>
        </>
      );
    },
  };
};
