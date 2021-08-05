import React, { useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
} from '@coreui/react'
import { EditForm } from './ModalContent/EditForm'
import { Activity } from './ModalContent/Activity'
import { ModalContainer } from './ModalContent/MocalContainer'




const usersData = [
    {
        "شماره رهگیری" 
        : "bc123aa",
        "نام مشتری" 
        : "پرنا اسدی",
        "نام پشتیبان"
        : "مرتضی بهجت",
        "تاریخ سفارش"
        : "1400/5/14",
        "تاریخ رزرو"
        : "online",
        "وضعیت":
        "لغو شده",
        "مدت زمان مکالمه"
        : "21 دقیقه",
        "مدت زمان باقی مانده"
        : "7 دقیقه",
        "شماره تماس مشتری"
        : "09379935851",
        "شماره تماس پشتیبان"
        : "09927824630",
        "پیگیری سفارش"
         :" <a>link</a>",
        "ویرایش سفارش"
        : "link",
    },
    {
        "شماره رهگیری" 
        : "bc123ca",
        "نام مشتری" 
        : "پرنا اسدی",
        "نام پشتیبان"
        : "مرتضی بهجت",
        "تاریخ سفارش"
        : "1400/5/14",
        "تاریخ رزرو"
        : "1400/5/18",
        "وضعیت":
        "در حال انجام",
        "مدت زمان مکالمه"
        : "21 دقیقه",
        "مدت زمان باقی مانده"
        : "5 دقیقه",
        "شماره تماس مشتری"
        : "09379935851",
        "شماره تماس پشتیبان"
        : "09927824630",
    },
]
 

const Tables = () => {
const fields = [
    { key:"شماره رهگیری", _style: { width: '13%'}  , sorter: false },
    { key:"نام مشتری", _style: { width: '15%'}  , sorter: false },
    { key: "نام پشتیبان", _style: { width: '15%'}  , sorter: false},
    { key: "تاریخ سفارش", _style: { width: '8%'} },
    { key:"تاریخ رزرو", _style: { width: '11%'} },
    { key:"مدت زمان باقی مانده", _style: { width: '15%'} },
    { key:"مدت زمان مکالمه", _style: { width: '13%'} },
    { key: "وضعیت", _style: { width: '10%'} , sorter: false,  filter: false},
    {
        key: "orderEdit",
        label: '',
        _style: { width: '1%'},
        sorter: false,
        filter: false
    },
    {
         key: "orderDetail",
        label: '',
         _style: { width: '1%'},
         sorter: false,
         filter: false
    },
]
    
const getBadge = (status)=>{
    switch (status) {
          case "تمام": return 'secondary'
          case "در حال انجام": return 'warning'
          case "لغو شده": return 'danger'
          default: return 'primary'
    }
}
    
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const toggle = ()=>{
    setModal(!modal);
  }
  return (
    <>
     <CCard>
        <CCardHeader>
            مشاوره های دقیقه ای پشتیبان ها
        </CCardHeader>
        <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              striped
              size="sm"
              columnFilter
              sorter
              itemsPerPage={20}
              pagination
              scopedSlots = {{
                'وضعیت':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item['وضعیت'])}>
                        {item['وضعیت']}
                      </CBadge>
                    </td>
                  ),
                  "orderDetail":
                  (item, index)=>{
                    return (<>
                      <td className="py-2 pl-2">
                            <CButton
                                onClick={() => {
                                    setModal(!modal);
                                    setModalContent(Activity(item));
                                  }}
                                className="mr-1"
                                color="danger"
                            >پیگیری
                            </CButton>
                      </td>
                      </>)
                  },
                  "orderEdit":
                  (item, index)=>{
                    return (<>
                      <td className="py-2 pl-2">
                            <CButton
                                onClick={() => {
                                    setModal(!modal);
                                    setModalContent(<EditForm/>);
                                  }}
                                className="mr-1"
                                color="primary"
                            >ویرایش
                            </CButton>
                      </td>
                     
                      </>)
                  },
              }}
            />
        </CCardBody>
     </CCard>
    <ModalContainer modal={modal} toggle={toggle} modalContent={modalContent} />
    </>
  )
}

export default Tables
