import { CCard, CCardHeader, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { WebinartModal } from "./Components/SubscriptionsModal";
import { WebinartScopedSlots } from "./Components/SubscriptionsScopedSlots";
import { TableHeader } from "./Components/TableHeader";
import { ChangeValues } from "./Utility/ChangeValues";
import { PostDataBroad } from "src/Service/APIBroadCast";
const ManageSubscriptions = () => {
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [filterData, setFilterData] = useState({
    asc: false,
    column: "quizId",
  });

  const updateData = () => {
    PostDataBroad("webinar/GetSubscriptions", {
      webinarId: 0,
      userId: 0,
    }).then((res) => {
      let data = ChangeValues(res.data);
      setTableData(data);
    });
  };

  useEffect(() => {
    updateData();
  }, [modal]);
  return (
    <>
      <CCard>
        <CCardHeader>مدیریت  سفارشات همایش های برترها</CCardHeader>
        <CDataTable
          items={tableData}
          fields={TableHeader}
          striped
          columnFilter
          size="sm"
          sorter
          onSorterValueChange={setFilterData}
          itemsPerPage={15}
          pagination
        //   scopedSlots={WebinartScopedSlots(setModalContent, setModal, modal)}
        />
      </CCard>
      {/* <WebinartModal
        name="مدیریت همایش"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      /> */}
    </>
  );
};

export default ManageSubscriptions;
