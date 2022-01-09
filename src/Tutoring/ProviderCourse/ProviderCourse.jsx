import { CCard, CCardHeader, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { ModalProvider } from "./ModalProvider";
import { ScopedSlots } from "./ScopedSlots";
import { TableHeader } from "./TableHeader";
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
    GetDataBroad("ProviderCourse/GetAll").then((res) => {
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
        <CCardHeader>مدیریت درس مشاور</CCardHeader>
        <CDataTable
          items={tableData}
          fields={TableHeader}
          striped
          size="sm"
          sorter={{ external: true, resetable: false }}
          onSorterValueChange={setFilterData}
          itemsPerPage={15}
          pagination
          scopedSlots={ScopedSlots(
            updateData,
            setModal,
            modal,
            setModalTutoring
          )}
        />
      </CCard>
      <ModalProvider
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
