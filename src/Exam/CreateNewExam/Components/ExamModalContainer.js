import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";

export const ExamModalContainer = ({ name, modal, toggle, modalContent }) => {
  return (
    <CModal show={modal} onClose={toggle}>
      <CModalHeader closeButton>{name}</CModalHeader>
      <CModalBody>{modalContent}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={toggle}>
          لفو
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
