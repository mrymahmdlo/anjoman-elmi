import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";

export const TimeSheetModal = ({ name, modal, toggle, modalTimeSheet }) => {
  return (
    <CModal show={modal} onClose={toggle}>
      <CModalHeader closeButton>{name}</CModalHeader>
      <CModalBody>{modalTimeSheet}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={toggle} size="sm">
          لفو
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
