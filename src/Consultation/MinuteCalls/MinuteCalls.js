import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CPagination,
} from "@coreui/react";
import { ModalContainer } from "./ModalContent/ModalContainer";
import { PostData } from "src/Service/APIEngine";
import { ChangeValues } from "./Utility/ChangeValues";
import { ScopedSlots } from "./Utility/ScopedSlots";

const Tables = () => {
  const [tableData, setTableData] = useState([]);
  const [tableFields, setTableFields] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [currentPage, setActivePage] = useState(1);
  const [startDate, setStartDate] = useState("1390/06/10");
  const [search, setSearch] = useState("");
  const [endDate, setEndDate] = useState("1500/07/10");
  const [filterData, setFilterData] = useState({
    asc: false,
    column: "ReserveDateTime",
  });
  
  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };

  useEffect(() => {
    updateData();
  }, [currentPage, filterData, startDate, endDate, search]);

  const updateData = async () => {
    PostData("MinuteConsultation/Order", {
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
      setTableFields([
        ...res.data.headers,
        ...[
          {
            key: "orderEdit",
            label: "",
            _style: { width: "1%" },
            sorter: false,
            filter: false,
          },
          {
            key: "orderDetail",
            label: "",
            _style: { width: "1%" },
            sorter: false,
            filter: false,
          },
          {
            key: "smsSender",
            label: "",
            _style: { width: "5%" },
            sorter: false,
            filter: false,
          },
        ],
      ]);
      let data = res.data.rows;
      ChangeValues(data);
      setTableData(data);
      setPageNum(Math.ceil(res.data.totalCount / 15));
    });
  };
  return (
    <>
      <CCard>
        <CCardHeader>مشاوره های دقیقه ای پشتیبان ها</CCardHeader>
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
        <CCardBody>
          <CDataTable
            items={tableData}
            fields={tableFields.filter(
              (field) =>
                field.key !== "providerPhoneNumber" &&
                field.key !== "customerPhoneNumber"
            )}
            striped
            size="sm"
            sorter={{ external: true, resetable: false }}
            onSorterValueChange={setFilterData}
            itemsPerPage={20}
            pagination
            scopedSlots={ScopedSlots(
              setModal,
              modal,
              setModalContent,
              updateData
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
      <ModalContainer
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      />
    </>
  );
};

export default Tables;
