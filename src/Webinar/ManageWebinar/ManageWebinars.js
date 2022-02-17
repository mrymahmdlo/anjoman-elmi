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
import { useDispatch } from "react-redux";
import {
  ShowLoading,
  HideLoading,
} from "src/reusable/LoadingSelector";
import React from "react";

const ManageWebinars = () => {
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const dispatch = useDispatch();


  const updateData = () => {
    dispatch(ShowLoading());
    // todo
    // add service
    APIBoardcastGet("Webinar/GetAll").then((res) => {
      let data = ChangeValuesManageWebinar(res.data);
      setTableData(data);
    })
    .finally(() => {
      dispatch(HideLoading());
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
