import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { GetData } from "src/Service/APIEngine";
import { Toast } from "src/Utility/Toast";
import EditTutoring from "../AllTutoring/EditTutoring/EditTutoring";

export const TutoringScopedSlots = (tableData, setModal, modal, setModalTutoring) => {
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");

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
