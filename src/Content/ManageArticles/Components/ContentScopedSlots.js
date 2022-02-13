import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { APICoreGet } from "src/Service/APIBase";
import { ToastContext } from "src/containers/TheContent";
import * as React from "react";

export const ContentScopedSlots = (
  updateData,
  setModal,
  modal,
  setModalContent
) => {
  const history = useHistory();
  const toast = React.useContext(ToastContext);
  const handleDelete = (contentId) => {
    APICoreGet("FreeContent/DeleteFreeContent?contentId=" + contentId)
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
    edit: (item) => (
      <>
        <td className="py-2 pl-2" key={item.contentId}>
          <CButton
            className="mr-1"
            color="primary"
            onClick={() =>
              history.push("/Content/FreeContent/EditArticle/" + item.contentId)
            }
          >
            <CIcon name="cil-pencil" />
          </CButton>
        </td>
      </>
    ),
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
