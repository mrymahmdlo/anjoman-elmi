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
  CPagination,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { SubscriptionsModal } from "./Components/SubscriptionsModal";
import { SubscriptionsScopedSlots } from "./Components/SubscriptionsScopedSlots";
import { TableHeader } from "./Components/TableHeader";
import { ChangeValuesManageSubscriptions } from "./Utility/ChangeValues";
import { APIBoardcastPost } from "src/Service/APIBroadCast";
import DownloadExcel from './Components/DownloadExcel'
import * as React from "react";

const ManageSubscriptions = () => {
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [search, setSearch] = useState("");
  const [tableFields, setTableFields] = useState([]);
  const [startDate, setStartDate] = useState("1390/06/10");
  const [endDate, setEndDate] = useState("1500/07/10");
  const [currentPage, setActivePage] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };
  const [filterData, setFilterData] = useState({
    asc: false,
    column: null,
  });

  const updateData = () =>
    //todo
    //add service
    {
      // add loading
      APIBoardcastPost("webinar/GetSubscriptions", {
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
        setTableFields([...res.data.headers, ...TableHeader]);
        let data = res.data.rows;
        ChangeValuesManageSubscriptions(data);
        setTableData(data);
        setPageNum(Math.ceil(res.data.totalCount / 20));
      });
    };

  const [bgColor, setBgColor] = useState("#027a40");
  const styles = {
    backgroundColor: `${bgColor}`,
    color: "#fff",
  };

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filterData, startDate, endDate, search, modal]);

  return (
    <>
      <CCard>
        <CCardHeader>مدیریت سفارشات همایش های برترها</CCardHeader>
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
              setModalContent(<DownloadExcel setModal={setModal} />);
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
            (field) => field.key !== "tutoringId" && field.key !== "providerId"
          )}
          striped
          size="sm"
          sorter={{ external: true, resetable: false }}
          onSorterValueChange={setFilterData}
          itemsPerPage={20}
          pagination
          scopedSlots={SubscriptionsScopedSlots(
            setModalContent,
            setModal,
            modal
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
      <SubscriptionsModal
        name="مدیریت سفارشات همایش"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      />
    </>
  );
};

export default ManageSubscriptions;
