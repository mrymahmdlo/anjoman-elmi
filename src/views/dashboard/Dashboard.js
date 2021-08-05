import React from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'


const Dashboard = () => {
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">آپدیت</h4>
              <div className="small text-muted">پنل مدیریت تماس های تلفنی اضافه شد</div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
