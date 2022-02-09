import {
  CCard,
  CCardHeader,
  CDataTable,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { WebinartModal } from "./Components/WebinartModal";
import { WebinartScopedSlots } from "./Components/WebinartScopedSlots";
import { TableHeaderWebinar } from "./Components/TableHeader";
import { ChangeValuesManageWebinar } from "./Utility/ChangeValues";
import { APIBoardcastGet } from "src/Service/APIBroadCast";
import React from "react";

const ManageWebinars = () => {
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  // todo
  // either use it or delete it
  // const [filterData, setFilterData] = useState({
  //   asc: false,
  //   column: "quizId",
  // });

  const updateData = () => {
    // todo
    // add service
    // add loading
    APIBoardcastGet("Webinar/GetAll").then((res) => {
      let data = ChangeValuesManageWebinar(res.data);
      setTableData(data);
    });
  };

  useEffect(() => {
     updateData();
   }, [modal]);
  return (
    <>
      <CCard>
        <CCardHeader>مدیریت همایش های برترها</CCardHeader>
        <CDataTable
          items={tableData}
          fields={TableHeaderWebinar}
          striped
          columnFilter
          size="sm"
          sorter
          //onSorterValueChange={setFilterData}
          itemsPerPage={15}
          pagination
          scopedSlots={WebinartScopedSlots(setModalContent, setModal, modal)}
        />
      </CCard>
      <WebinartModal
        name="مدیریت همایش"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      />
    </>
  );
};

export default ManageWebinars;
