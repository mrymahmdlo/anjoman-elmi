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
import { GetDataBroad } from "src/Service/APIBroadCast";
const ManageWebinars = () => {
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [filterData, setFilterData] = useState({
    asc: false,
    column: "quizId",
  });

  const updateData = () => {
    GetDataBroad("Webinar/GetAll").then((res) => {
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
          onSorterValueChange={setFilterData}
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
