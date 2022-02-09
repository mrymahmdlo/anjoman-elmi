import CIcon from "@coreui/icons-react";
import { CButton, CBadge } from "@coreui/react";
import { useState } from "react";
import { Toast } from "src/Utility/Toast";
import { APIBoardcastPost } from "src/Service/APIBroadCast";

export const ProviderCourseScopedSlots = (updateData, setModal, modal, setModalTutoring) => {
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const handleDelete = (Id) => {
    APIBoardcastPost("ProviderCourse/Remove/" + Id)
      .then(() => {
        setErrorContent("داده با موفقیت حذف شد");
        setModal(false);
      })
      .catch(() => {
        setErrorContent("خطا در حذف ");
      })
      .finally(() => {
        setShowError(true);
        updateData();
      });
  };

  return {
    courseName: (item) => {
      return (
        <td className="py-2 pl-2">
          <CBadge style={{ direction: "ltr" }}>{item.course.courseName}</CBadge>
        </td>
      );
    },
    delete: (item) => (
      <>
        <td className="py-2 pl-2" key={item.rowId}>
          <CButton
            className="mr-1 btn btn-danger"
            onClick={() => {
              setModalTutoring(
                <div>
                  <p>
                    آیا میخواهید {item.course.courseName} را حذف کنید؟
                    <CButton
                      color="danger"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleDelete(item.rowId)}
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
