import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import { APIProviderPost } from "src/Service/APIProvider";
import { ToastContext } from "src/containers/TheContent";
import React from "react";

export const ProviderScopedSlots = (updateData, setModal, modal, setModalContent) => {
  const toast = React.useContext(ToastContext);
  const handleDelete = (contentId) => {
    APIProviderPost(`Content/Delete/${contentId}`)
      .then(() => {
        toast.showToast("داده با موفقیت حذف شد");
        setModal(false);
      })
      .catch(() => {
        toast.showToast("خطا در حذف محتوا");
      })
      .finally(() => {
        updateData();
      });
  };

  return {
    delete: (item) => (
      <>
        <td className="py-2 pl-2" key={item.contentId}>
          <CButton
            className="mr-1 btn btn-danger"
            onClick={() => {
              setModalContent(
                <div>
                  <p>
                    آیا میخواهید {item.title} را حذف کنید؟
                    <CButton
                      color="danger"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleDelete(item.contentId)}
                    >
                      بله
                    </CButton>
                  </p>
                </div>
              );
              setModal(!modal);
            }}
          >
            <CIcon name="cil-trash" />
          </CButton>
        </td>
      </>
    ),
  };
};
