import { CCard, CCardHeader, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { ProviderModalProviderCourse } from "./ModalProvider";
import { ProviderCourseScopedSlots } from "./ScopedSlots";
import { TableHeaderProviderCourse } from "./TableHeader";
import { APIBoardcastGet } from "src/Service/APIBroadCast";
import React from "react";

// todo
// change format to js
const ManageTutoring = () => {
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalTutoring, setModalTutoring] = useState("");
  // todo
  // either use it or remove it
  // const [filterData, setFilterData] = useState({
  //   asc: false,
  //   column: "quizId",
  // });

  const updateData = () => {
    APIBoardcastGet("ProviderCourse/GetAll").then((res) => {
      setTableData(res.data);
    });
  };

  useEffect(() => {
    updateData();
  }, [modal]);
  return (
    // todo
    // table not update after delete a row
    <>
      <CCard>
        <CCardHeader>مدیریت درس مشاور</CCardHeader>
        <CDataTable
          items={tableData}
          fields={TableHeaderProviderCourse}
          striped
          columnFilter
          size="sm"
          sorter
          //onSorterValueChange={setFilterData}
          itemsPerPage={15}
          pagination
          scopedSlots={ProviderCourseScopedSlots(
            updateData,
            setModal,
            modal,
            setModalTutoring
          )}
        />
      </CCard>
      <ProviderModalProviderCourse
        name="مدیریت درس مشاور"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalTutoring={modalTutoring}
      />
    </>
  );
};

export default ManageTutoring;
