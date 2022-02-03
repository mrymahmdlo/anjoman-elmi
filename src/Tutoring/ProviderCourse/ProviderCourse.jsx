import { CCard, CCardHeader, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { ProviderModalProviderCourse } from "./ModalProvider";
import { ProviderCourseScopedSlots } from "./ScopedSlots";
import { TableHeaderProviderCourse } from "./TableHeader";
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
          fields={TableHeaderProviderCourse}
          striped
          columnFilter
          size="sm"
          sorter
          onSorterValueChange={setFilterData}
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
