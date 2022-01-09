import { CCard, CCardHeader, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { TutoringModal } from "./Components/TutoringModal";
import { TutoringScopedSlots } from "./Components/TutoringScopedSlots";
import { TableHeader } from "./Components/TableHeader";
// import { ChangeValues } from "./Utility/ChangeValues";
import { GetDataBroad } from "src/Service/APIBroadCast";
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
      //   let data = ChangeValues(res.data);
      setTableData(res.data);
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
          fields={TableHeader}
          striped
          size="sm"
          sorter={{ external: true, resetable: false }}
          onSorterValueChange={setFilterData}
          itemsPerPage={15}
          pagination
          scopedSlots={TutoringScopedSlots(
            updateData,
            setModal,
            modal,
            setModalTutoring
          )}
        />
      </CCard>
      <TutoringModal
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
