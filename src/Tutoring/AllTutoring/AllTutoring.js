import { useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CDataTable,
} from "@coreui/react";
import { TableHeaders } from "./TableHeaders";
import { ChangeValue } from "./ChangeValue";
import { PostDataBroad } from "src/Service/APIBroadCast";
import {TutoringScopedSlots} from './TutoringScopedSlots';
import { TutoringModal } from "./TutoringModal";

const AllTutoring = () => {
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalTutoring, setModalTutoring] = useState("");
  const [startDate, setStartDate] = useState("1390/06/10");
  const [endDate, setEndDate] = useState("1500/07/10");
  const [phoneNumber, setPhoneNumber] = useState();
  const [filterData, setFilterData] = useState({
    asc: false,
    column: "quizId",
  });

  const updateData = () => {
    PostDataBroad("Tutoring/GetAllTutoring", {
      //   phoneNumber: phoneNumber,
      //   fromTime: startDate,
      //   toTime: endDate,
    }).then((res) => {
      let data = ChangeValue(res.data);
      setData(res.data);
      setTableData(data);
    });
  };

  useEffect(() => {
    updateData();
  }, [modal, startDate, endDate, phoneNumber]);
  return (
    <>
      <CCard>
        <CCardHeader> مشاهده جلسات برگزار شده </CCardHeader>
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
          scopedSlots={TutoringScopedSlots(
            data,
            setModal,
            modal,
            setModalTutoring
          )}
        />
      </CCard>
      <TutoringModal
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
