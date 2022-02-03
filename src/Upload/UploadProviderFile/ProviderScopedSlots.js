import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import { useState } from "react";
import { PostDataProvider } from "src/Service/APIProvider";
import { Toast } from "src/Utility/Toast";

export const ProviderScopedSlots = (updateData, setModal, modal, setModalContent) => {
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const handleDelete = (contentId) => {
    PostDataProvider(`Content/Delete/${contentId}`)
      .then(() => {
        setErrorContent("داده با موفقیت حذف شد");
        setModal(false);
      })
      .catch(() => {
        setErrorContent("خطا در حذف محتوا");
      })
      .finally(() => {
        setShowError(true);
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
          <Toast showError={showError} errorContent={errorContent} />
        </td>
      </>
    ),
  };
};
