import React from "react";
import { CCard, CCardBody, CCardHeader, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { PostDataProvider } from "src/Service/APIProvider";
import {ChangeValues} from "./Components/ChangeValue";
import { TimeSheetModal } from "./Components/TimeSheetModal";
import { TimeSheetScopedSlots } from "./Components/TimeSheetScopedSlots";
import { TableHeaders } from "./Components/TableHeaders";

const ManageTimeSheet = () => {
  const [tableData, setTableData] = useState([]);
  const tableFields = TableHeaders;
  const [modal, setModal] = useState(false);
  const [modalTimeSheet, setModalTimeSheet] = useState("");

  const updateData = () => {
    PostDataProvider("TimeSheet/GetTimeSheets", {}).then((res) => {
      let data=ChangeValues(res.data)
      setTableData(data);
    });
  };

  useEffect(() => {
    updateData();
  }, [modal]);

  return (
    <>
      <CCard>
        <CCardHeader>مدیریت زمان بندی</CCardHeader>
        <CCardBody>
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
