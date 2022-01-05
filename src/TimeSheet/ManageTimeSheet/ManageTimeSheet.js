import React, {useEffect, useState} from "react";
import {CCard, CCardBody, CCardHeader, CDataTable, CFormGroup, CSelect} from "@coreui/react";
import {PostDataProvider} from "src/Service/APIProvider";
import {ChangeValues} from "./Components/ChangeValue";
import {TimeSheetModal} from "./Components/TimeSheetModal";
import {TimeSheetScopedSlots} from "./Components/TimeSheetScopedSlots";
import {TableHeaders} from "./Components/TableHeaders";
import {PostData} from "src/Service/APIEngine";

const ManageTimeSheet = () => {
  const [tableData, setTableData] = useState([]);
  const tableFields = TableHeaders;
  const [modal, setModal] = useState(false);
  const [modalTimeSheet, setModalTimeSheet] = useState("");
  const [form, setForm] = useState({});
  const [providers, setProviders] = useState([]);

  const updateData = () => {
    PostDataProvider("TimeSheet/GetTimeSheets", {
      providerId: Number(form.providerId)
    }).then((res) => {
      setTableData(ChangeValues(res.data));
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
        <CCardHeader>مدیریت زمان بندی</CCardHeader>
        <CCardBody>
          <CFormGroup className="text-right w-40 m-2">
            <label className="p-1 mr-1"> ارائه دهنده : </label>
            <CSelect
              value={form.providerId}
              onChange={(e) => setForm({...form, providerId: e.target.value})}
            >
              <option value={-1}>پشتیبان را انتخاب کنید</option>
              {/*<option value={providers.length}>همه پشتیبان ها</option>*/}
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
          </CFormGroup>
          <CDataTable
            items={tableData}
            fields={tableFields}
            striped
            size="sm"
            sorter
            itemsPerPage={15}
            pagination
            scopedSlots={TimeSheetScopedSlots(
              updateData,
              setModal,
              modal,
              setModalTimeSheet,
            )}
          />
        </CCardBody>
      </CCard>
      <TimeSheetModal
        name="مدیریت زمان بندی"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalTimeSheet={modalTimeSheet}
      />
    </>
  );
};

export default ManageTimeSheet;
