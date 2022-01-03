import { useEffect, useState } from "react";
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
import { TableHeaders } from "./TableHeaders";
import { ChangeValue } from "./ChangeValue";
import { PostDataProvider } from "src/Service/APIProvider";
import {ProviderScopedSlots} from "./ProviderScopedSlots";
import {ProviderModal} from './ProviderModal';
const ManageuploadProvider = () => {
  const [tableData, setTableData] = useState([]);
  
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [startDate, setStartDate] = useState("1390/06/10");
  const [endDate, setEndDate] = useState("1500/07/10");
  const [phoneNumber, setPhoneNumber] = useState();
  const [filterData, setFilterData] = useState({
    asc: false,
    column: "quizId",
  });

  const updateData = () => {
    PostDataProvider("Content/GetAll", {
      //   phoneNumber: phoneNumber,
      //   fromTime: startDate,
      //   toTime: endDate,
    }).then((res) => {
      let data = ChangeValue(res.data);
      setTableData(data);
    });
  };

  useEffect(() => {
    updateData();
  }, [modal, startDate, endDate, phoneNumber]);
  return (
    <>
      <CCard>
        <CCardHeader> مشاهده فایل های بارگزاری شده </CCardHeader>
        {/* <CCardBody>
          <CForm inline>
            <CFormGroup className=" pl-1">
              <CLabel className="pr-1">جستجو شماره تماس</CLabel>
              <CInput
                className="mr-2"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
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
        </CCardBody> */}
        <CDataTable
          items={tableData}
          fields={TableHeaders}
          striped
          size="sm"
          sorter={{ external: true, resetable: false }}
          onSorterValueChange={setFilterData}
          itemsPerPage={15}
          pagination
          scopedSlots={ProviderScopedSlots(
            updateData,
            setModal,
            modal,
            setModalContent
          )}
        />
      </CCard>
      <ProviderModal
        name="مدیریت محتواهای عمومی"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      />
    </>
  );
};

export default ManageuploadProvider;
