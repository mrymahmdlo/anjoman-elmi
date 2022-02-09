import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import * as React from "react";

export const ModalContainer = ({ modal, toggle, modalContent }) => {
  return (
    <CModal show={modal} onClose={toggle}>
      <CModalHeader closeButton>تماس تلفنی</CModalHeader>
      <CModalBody>{modalContent}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={toggle}>
          لفو
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
