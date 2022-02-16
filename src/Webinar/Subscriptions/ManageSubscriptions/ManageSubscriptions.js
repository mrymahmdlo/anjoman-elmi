import { CCard, CCardHeader, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { SubscriptionsModal } from "./Components/SubscriptionsModal";
import { SubscriptionsScopedSlots } from "./Components/SubscriptionsScopedSlots";
import { TableHeader } from "./Components/TableHeader";
import { ChangeValuesManageSubscriptions } from "./Utility/ChangeValues";
import { APIBoardcastPost } from "src/Service/APIBroadCast";
import * as React from "react";

const ManageSubscriptions = () => {
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const updateData = () =>
    //todo
    //add service
    { // add loading
      APIBoardcastPost("webinar/GetSubscriptions", {
        webinarId: 0,
        userId: 0,
        isJoinedFilter: true,
      }).then((res) => {
        let data = ChangeValuesManageSubscriptions(res.data);
        setTableData(data);
      });
    };

  useEffect(() => {
    updateData();
  }, [modal]);
  return (
    <>
      <CCard>
        <CCardHeader>مدیریت سفارشات همایش های برترها</CCardHeader>
        <CDataTable
          items={tableData}
          fields={TableHeader}
          striped
          columnFilter
          size="sm"
          sorter
          itemsPerPage={15}
          pagination
          scopedSlots={SubscriptionsScopedSlots(
            setModalContent,
            setModal,
            modal
          )}
        />
      </CCard>
      <SubscriptionsModal
        name="مدیریت سفارشات همایش"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      />
    </>
  );
};

export default ManageSubscriptions;
