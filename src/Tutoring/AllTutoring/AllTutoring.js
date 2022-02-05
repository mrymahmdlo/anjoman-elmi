import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard, CCardBody,
  CCardHeader, CCol,
  CDataTable, CFormGroup, CRow, CSelect,
} from "@coreui/react";
import { TableHeadersAllTutoring } from "./TableHeaders";
import { ChangeValuesAllTutoring } from "./ChangeValue";
import { PostDataBroad } from "src/Service/APIBroadCast";
import {AllTutoringScopedSlots} from './TutoringScopedSlots';
import { TutoringModalAllTutoring } from "./TutoringModal";
import {PostData} from "../../Service/APIEngine";
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
  const [providers, setProviders] = useState([]);

  const updateData = () => {
    form.providerId ?
      PostDataBroad("Tutoring/GetAllTutoring", {
        providerId: +form.providerId,
      }).then((res) => {
        let data = ChangeValuesAllTutoring(res.data);
        setData(res.data);
        setTableData(data);
      }) :
      PostDataBroad("Tutoring/GetAllTutoring", {}).then((res) => {
        setTableData(ChangeValuesAllTutoring(res.data));
      });
  };

  useEffect(() => {
    updateData();
  }, [modal, form.providerId]);

  // useEffect(() => {
  //   PostData("Provider/Tutoring", {}).then((res) => {
  //     setProviders(res.data);
  //   });
  // }, []);

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
              {/* <CCol sm={6}>

                <CSelect
                  value={form.providerId}
                  onChange={(e) =>
                    setForm({ ...form, providerId: e.target.value })
                  }
                >
                  <option value={0}>پشتیبان را انتخاب کنید</option>
                  {providers.length > 0 ? (
                    providers?.map((item) => (
                      <option value={item.providerId} key={item.providerId}>
                        {item.name + " " + item.lastName}{" "}
                      </option>
                    ))
                  ) : (
                    <option>پشتیبانی وجود ندارد</option>
                  )}
                </CSelect>
              </CCol> */}
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
