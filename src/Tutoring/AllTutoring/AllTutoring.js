import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CPagination,
} from "@coreui/react";
import { TableHeadersAllTutoring } from "./TableHeaders";
import { ChangeValuesAllTutoring } from "./ChangeValue";
import { PostDataBroad } from "src/Service/APIBroadCast";
import { AllTutoringScopedSlots } from "./TutoringScopedSlots";
import { TutoringModalAllTutoring } from "./TutoringModal";
import DownloadExcel from "./ExcelReport/DownloadExcel";

const AllTutoring = () => {
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [modalTutoring, setModalTutoring] = useState("");
  const [tableFields, setTableFields] = useState([]);
  const [startDate, setStartDate] = useState("1390/06/10");
  const [endDate, setEndDate] = useState("1500/07/10");
  const [currentPage, setActivePage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
  const [filterData, setFilterData] = useState({
    asc: false,
    column: "purchasedDate",
  });
  const [form, setForm] = useState({});
 const capitalizeFirstLetter = (string) => {
   return string?.charAt(0).toUpperCase() + string?.slice(1);
 };
  const updateData = () => {
    PostDataBroad("Admin/Tutoring/GetAll", {
      filterModel: {
        fromDateTime: startDate,
        toDateTime: endDate,
      },
      dataTableModel: {
        orderCol: capitalizeFirstLetter(filterData.column),
        searchTerm: search,
        orderAscending: filterData.asc, 
        page: currentPage,
        length: 15,
      },
    }).then((res) => {
      setTableFields([...res.data.headers, ...TableHeadersAllTutoring]);
      let data = res.data.rows;
      ChangeValuesAllTutoring(data);
      setTableData(data);
        setPageNum(Math.ceil(res.data.totalCount / 20));
    });
  };

  useEffect(() => {
    updateData();
  }, [modal, currentPage, filterData, startDate, endDate, search]);

  const [bgColor, setBgColor] = useState("#027a40");
  const styles = {
    backgroundColor: `${bgColor}`,
    color: "#fff",
  };

  return (
    <>
      <CCard>
        <CCardHeader> مشاهده جلسات برگزار شده </CCardHeader>
        <CCardBody>
          <CForm inline>
            <CFormGroup className=" pl-1">
              <CLabel className="pr-1">جستجو</CLabel>
              <CInput
                className="mr-2"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </CFormGroup>
            <CFormGroup className=" pl-1">
              <CLabel htmlFor="exampleInputName2" className="pr-1">
                از تاریخ
              </CLabel>
              <CInput
                className="mr-2"
                onChange={(e) => setStartDate(e.target.value)}
                placeholder={startDate}
              />
            </CFormGroup>
            <CFormGroup className="pr-2 pl-1">
              <CLabel htmlFor="exampleInputEmail2" className="pr-1">
                تا تاریخ
              </CLabel>
              <CInput
                className="mr-2"
                onChange={(e) => setEndDate(e.target.value)}
                placeholder={endDate}
              />
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCol>
          <CButton
            style={styles}
            className="mr-2"
            onMouseEnter={() => setBgColor("#00944e")}
            onMouseLeave={() => setBgColor("#027a40")}
            onClick={() => {
              setModalTutoring(<DownloadExcel setModal={setModal} />);
              setModal(true);
            }}
          >
            دریافت گزارش اکسل
          </CButton>
        </CCol>
        <CCardBody>
          <CDataTable
            items={tableData}
            fields={tableFields.filter(
              (field) =>
                field.key !== "tutoringId" &&
                field.key !== "providerId" &&
                field.key !== "studentId" &&
                field.key !== "tutorialId"
            )}
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
        <CPagination
          className="pr-3 d-flex"
          activePage={currentPage}
          pages={pageNum}
          onActivePageChange={(i) => setActivePage(i)}
        ></CPagination>
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
