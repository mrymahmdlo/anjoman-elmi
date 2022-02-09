import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React from "react";
// todo
// change format to js
export const ProviderModalProviderCourse = ({ name, modal, toggle, modalTutoring }) => {
  return (
    <CModal show={modal} onClose={toggle}>
      <CModalHeader closeButton>{name}</CModalHeader>
      <CModalBody>{modalTutoring}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={toggle} size="sm">
          لفو
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
