import React, { useState } from "react";
import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import { PostDataProvider } from "src/Service/APIProvider";
import { Toast } from "src/Utility/Toast";
import EditTimeSheet from "../../EditTimeSheet/EditTimeSheet";

export const TimeSheetScopedSlots = (updateData, setModal, modal, setModalTimeSheet) => {
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const handleDelete = (Id) => {
    PostDataProvider("TimeSheet/Delete/" + Id)
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
    edit: (item) => (
      <>
        <td className="py-2 pl-2" key={item.timeSheetId}>
          <CButton
            className="mr-1"
            color="primary"
            onClick={() =>
                  { setModalTimeSheet(
                    <EditTimeSheet obj={item} setModal={setModal} />
                  );
              setModal(true);}
            }
          >
            <CIcon name="cil-pencil" />
          </CButton>
        </td>
      </>
    ),
    delete: (item) => (
      <>
        <td className="py-2 pl-2" key={item.timeSheetId}>
          <CButton
            className="mr-1 btn btn-danger"
            onClick={() => {
              setModalTimeSheet(
                <div>
                  <p>
                    آیا میخواهید این مورد را حذف کنید؟
                    <CButton
                      color="danger"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleDelete(item.timeSheetId)}
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
