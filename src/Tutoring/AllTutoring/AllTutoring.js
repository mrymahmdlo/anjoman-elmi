import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard, CCardBody,
  CCardHeader, CCol,
  CDataTable, CFormGroup, CRow, 
} from "@coreui/react";
import { TableHeadersAllTutoring } from "./TableHeaders";
import { ChangeValuesAllTutoring } from "./ChangeValue";
import { APIBoardcastPost } from "src/Service/APIBroadCast";
import {AllTutoringScopedSlots} from './TutoringScopedSlots';
import { TutoringModalAllTutoring } from "./TutoringModal";
import DownloadExcel from "./ExcelReport/DownloadExcel";

const AllTutoring = () => {
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalTutoring, setModalTutoring] = useState("");
  const [filterData, setFilterData] = useState({
    asc: false,
    column: "quizId",
  });
  const [form, setForm] = useState({});
 

  const updateData = () => {
    form.providerId ?
    APIBoardcastPost("Tutoring/GetAllTutoring", {
        providerId: +form.providerId,
      }).then((res) => {
        let data = ChangeValuesAllTutoring(res.data);
        setData(res.data);
        setTableData(data);
      }) :
      APIBoardcastPost("Tutoring/GetAllTutoring", {}).then((res) => {
        setTableData(ChangeValuesAllTutoring(res.data));
      });
  };

  useEffect(() => {
    updateData();
  }, [modal, form.providerId]);



  const [bgColor, setBgColor]=useState('#027a40');
  const styles={
    backgroundColor: `${bgColor}`,
    color: '#fff',
  };

  return (
    <>
      <CCard>
        <CCardHeader> مشاهده جلسات برگزار شده </CCardHeader>
        <CCardBody>
          <CFormGroup>
            <CRow>
             
              <CCol>
                <CButton
                  style={styles}
                  onMouseEnter={() => setBgColor("#00944e")}
                  onMouseLeave={() => setBgColor("#027a40")}
                  onClick={() => {
                    setModalTutoring(
                      <DownloadExcel  setModal={setModal}/>
                    );
                    setModal(true);
                  }}
                >
                  دریافت گزارش اکسل
                </CButton>
              </CCol>
            </CRow>
          </CFormGroup>
          <CDataTable
            items={tableData}
            fields={TableHeadersAllTutoring}
            striped
            columnFilter
            size="sm"
            sorter
            onSorterValueChange={setFilterData}
            itemsPerPage={15}
            pagination
            scopedSlots={AllTutoringScopedSlots(
              data,
              setModal,
              modal,
              setModalTutoring
            )}
          />
        </CCardBody>
      </CCard>
        <TutoringModalAllTutoring
          name=" تدریس خصوصی"
          modal={modal}
          toggle={() => {
            setModal(!modal);
          }}
          modalTutoring={modalTutoring}
        />
    </>
  );
};

export default AllTutoring;
