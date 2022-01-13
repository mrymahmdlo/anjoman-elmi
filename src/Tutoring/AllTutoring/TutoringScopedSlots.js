import { CButton, CBadge } from "@coreui/react";
import EditTutoring from "../AllTutoring/EditTutoring/EditTutoring";

export const TutoringScopedSlots = (
  tableData,
  setModal,
  modal,
  setModalTutoring
) => {
  return {
    edit: (tableData, index) => (
      <>
        <td className="py-2 pl-2" key={tableData.tutoringId}>
          <CButton
            className="mr-1"
            color="primary"
            onClick={() => {
              setModalTutoring(
                <EditTutoring obj={tableData} setModal={setModal} />
              );
              setModal(true);
            }}
          >
            تدریس مجدد
          </CButton>
        </td>
      </>
    ),

    status: (item) => {
      return (
        <td className="py-2 pl-2">
          <CBadge
            style={{ direction: "ltr" }}
            // color={item.status === "آماده ی شرکت" ? "success" : "danger"}
          >
            {item.status}
          </CBadge>
        </td>
      );
    },
    isOnline: (item) => {
      return (
        <td className="py-2 pl-2">
          <CBadge
            style={{ direction: "ltr" }}
            color={
              item.isOnline === false
                ? "dark"
                : item.isOnline === true
                ? "light"
                : "primary"
            }
          >
            {item.isOnline}
          </CBadge>
        </td>
      );
    },
  };
};
