import { CCard, CCardHeader, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";

import { TableHeaders } from "./TableHeaders";
import { ChangeValue } from "./ChangeValue";
import { PostDataBroad } from "src/Service/APIBroadCast";
const Sms = () => {
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [filterData, setFilterData] = useState({
    asc: false,
    column: "quizId",
  });

  const updateData = () => {
    PostDataBroad("Main/AllSms",{}).then((res) => {
      let data = ChangeValue(res.data);
      setTableData(data);
    });
  };

  useEffect(() => {
    updateData();
  }, [modal]);
  return (
    <>
      <CCard>
        <CCardHeader>مدیریت   پیامک های ارسالی</CCardHeader>
        <CDataTable
          items={tableData}
          fields={TableHeaders}
          striped
          size="sm"
          sorter={{ external: true, resetable: false }}
          onSorterValueChange={setFilterData}
          itemsPerPage={15}
          pagination
        //   scopedSlots={WebinartScopedSlots(setModalContent, setModal, modal)}
        />
      </CCard>
   
    </>
  );
};

export default Sms;
