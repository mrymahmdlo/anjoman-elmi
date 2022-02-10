import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import EditTutoring from "src/Tutoring/EditTutoring/EditTutoring";
import React from "react";

export const ManageTutoringScopedSlots = (updateData, setModal, modal, setModalTutoring) => {
  return {
    edit: (item) => (
      <>
        <td className="py-2 pl-2" key={item.productId}>
          <CButton
            className="mr-1"
            color="primary"
            onClick={() =>
                  { setModalTutoring(
                    <EditTutoring obj={item} setModal={setModal} />
                  );
              setModal(true);}
            }
          >
            <CIcon name="cil-pencil" />
          </CButton>
        </td>
      </>
    ),
  };
};
