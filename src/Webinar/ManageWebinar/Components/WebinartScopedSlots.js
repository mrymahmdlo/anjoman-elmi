import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { GetData } from "src/Service/APIEngine";
import { Toast } from "src/Utility/Toast";

export const WebinartScopedSlots = (updateData, setModal, modal, setModalContent) => {
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const history = useHistory();
  const handleDelete = (quizId) => {
    GetData("FreeContent/DeleteFreeContent?contentId=" + quizId)
      .then(() => {
        setErrorContent("داده با موفقیت حذف شد");
        setModal(false);
      })
      .catch(() => {
        setErrorContent("خطا در حذف همایش");
      })
      .finally(() => {
        setShowError(true);
        updateData();
      });
  };

  return {
    edit: (item, index) => (
      <>
        <td className="py-2 pl-2" key={item.quizId}>
          <CButton
            className="mr-1"
            color="primary"
            onClick={() => history.push("/Webinar/EditWebinar/" + item.quizId)}
          >
            <CIcon name="cil-pencil" />
          </CButton>
        </td>
      </>
    ),
    delete: (item, index) => (
      <>
        <td className="py-2 pl-2" key={item.quizId}>
          <CButton
            className="mr-1 btn btn-danger"
            onClick={() => {
              setModalContent(
                <div>
                  <p>
                    آیا میخواهید {item.quizTitle} را حذف کنید؟
                    <CButton
                      color="danger"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleDelete(item.quizId)}
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
