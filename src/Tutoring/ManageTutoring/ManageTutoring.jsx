import { CCard, CCardHeader, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { TutoringModalManageTutoring } from "./Components/TutoringModal";
import { ManageTutoringScopedSlots } from "./Components/TutoringScopedSlots";
import { TableHeaderManageTutoring } from "./Components/TableHeader";
import { GetDataBroad } from "src/Service/APIBroadCast";
import {ChangeValuesManageTutoring} from "./Components/ChangeValue";

const ManageTutoring = () => {
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalTutoring, setModalTutoring] = useState("");
  const [filterData, setFilterData] = useState({
    asc: false,
    column: "quizId",
  });

  const updateData = () => {
    GetDataBroad("Tutorial/GetAll").then((res) => {
      setTableData(ChangeValuesManageTutoring(res.data));
    });
  };

  useEffect(() => {
    updateData();
  }, [modal]);
  return (
    <>
      <CCard>
        <CCardHeader>مدیریت تدریس خصوصی برترها</CCardHeader>
        <CDataTable
          items={tableData}
          fields={TableHeaderManageTutoring}
          striped
          hover
          columnFilter
          size="sm"
          sorter
          onSorterValueChange={setFilterData}
          itemsPerPage={15}
          pagination
          scopedSlots={ManageTutoringScopedSlots(
            updateData,
            setModal,
            modal,
            setModalTutoring
          )}
        />
      </CCard>
      <TutoringModalManageTutoring
        name="مدیریت تدریس خصوصی"
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
