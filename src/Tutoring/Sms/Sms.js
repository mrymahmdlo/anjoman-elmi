import {useEffect, useState} from "react";
import {
  CCard,
  CCardHeader,
  CDataTable,
} from "@coreui/react";
import {TableHeadersSms} from "./TableHeaders";
import {ChangeValueSms} from "./ChangeValue";
import {PostDataBroad} from "src/Service/APIBroadCast";

const Sms = () => {
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState({
    asc: false,
    column: "quizId",
  });

  const updateData = () => {
    PostDataBroad("Main/AllSms", {
    }).then((res) => {
      let data = ChangeValueSms(res.data);
      setTableData(data);
    });
  };

  useEffect(() => {
    updateData();
  }, []);
  return (
    <>
      <CCard>
        <CCardHeader>مدیریت پیامک های ارسالی</CCardHeader>
        <CDataTable
          items={tableData}
          fields={TableHeadersSms}
          striped
          columnFilter
          size="sm"
          sorter
          onSorterValueChange={setFilterData}
          itemsPerPage={15}
          pagination
        />
      </CCard>
    </>
  );
};

export default Sms;
