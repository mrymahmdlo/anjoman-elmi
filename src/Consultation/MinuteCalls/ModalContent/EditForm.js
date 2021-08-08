import React from 'react'
import {
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
} from '@coreui/react'

export const EditForm = () => {
    return(
        <CForm action="" method="post">
            <CFormGroup>
                <CLabel htmlFor="nf-provider">نام پشتیبان</CLabel>
                    <CInput
                        type="text"
                        id="nf-provider"
                        name="nf-provider"
                    />
                    <CFormText className="help-block">اسم پشتیبان جدید را وارد کنید</CFormText>
                    </CFormGroup>
                     <CFormGroup>
                    <CLabel htmlFor="nf-time">تاریخ سفارش</CLabel>
                    <CInput
                    type="time"
                    id="nf-time"
                    name="nf-time"
                    />
                    <CInput
                    type="date"
                    id="nf-date"
                    name="nf-date"
                    />
                <CFormText className="help-block">تاریخ جدید سفارش را وارد کنید</CFormText>
            </CFormGroup>
        </CForm>
    );
}