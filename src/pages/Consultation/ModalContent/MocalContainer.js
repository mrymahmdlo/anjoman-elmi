import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
  } from '@coreui/react'

export const ModalContainer = ({modal,toggle,modalContent}) =>{
    return(
        <CModal
        show={modal}
        onClose={toggle}
        >
            <CModalHeader closeButton>پیگیری سفارش</CModalHeader>
            <CModalBody>
                {modalContent}
            </CModalBody>
            <CModalFooter>
            <CButton color="primary">ثبت</CButton>{' '}
                <CButton
                    color="secondary"
                    onClick={toggle}
                >لفو</CButton>
            </CModalFooter>
        </CModal>
    );
}