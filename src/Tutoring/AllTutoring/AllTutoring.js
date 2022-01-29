import React, { useEffect, useState } from "react";
import {
  CCard, CCardBody,
  CCardHeader, CCol,
  CDataTable, CFormGroup, CSelect,
} from "@coreui/react";
import { TableHeaders } from "./TableHeaders";
import { ChangeValue } from "./ChangeValue";
import { PostDataBroad } from "src/Service/APIBroadCast";
import {TutoringScopedSlots} from './TutoringScopedSlots';
import { TutoringModal } from "./TutoringModal";
import {PostData} from "../../Service/APIEngine";

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
  const [form, setForm] = useState({});
  const [providers, setProviders] = useState([]);

  const updateData = () => {
    form.providerId ?
      PostDataBroad("Tutoring/GetAllTutoring", {
        //   phoneNumber: phoneNumber,
        //   fromTime: startDate,
        //   toTime: endDate,
        providerId: +form.providerId,
      }).then((res) => {
        let data = ChangeValue(res.data);
        setData(res.data);
        setTableData(data);
      }) :
      PostDataBroad("Tutoring/GetAllTutoring", {}).then((res) => {
        setTableData(ChangeValue(res.data));
      });
  };

  useEffect(() => {
    updateData();
  }, [modal, form.providerId]);

  useEffect(() => {
    PostData("Provider/Tutoring", {}).then((res) => {
      setProviders(res.data);
    });
  }, []);

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
        <CCardBody>
          <CFormGroup>
            <CCol sm={6}>

              <CSelect
                value={form.providerId}
                onChange={(e) =>
                  setForm({ ...form, providerId: e.target.value })
                }
              >
                <option value={-1}>پشتیبان را انتخاب کنید</option>
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
            </CCol>
          </CFormGroup>
          <CDataTable
            items={tableData}
            fields={TableHeaders}
            striped
            columnFilter
            size="sm"
            sorter
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
        </CCardBody>
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
