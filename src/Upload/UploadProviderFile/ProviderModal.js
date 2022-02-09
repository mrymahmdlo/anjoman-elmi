import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React from "react";

export const ProviderModalUpload = ({ name, modal, toggle, modalContent }) => {
  return (
    <CModal show={modal} onClose={toggle}>
      <CModalHeader closeButton>{name}</CModalHeader>
      <CModalBody>{modalContent}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={toggle} size="sm">
          لفو
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
