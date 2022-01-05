import { CButton } from "@coreui/react";
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
  };
};
