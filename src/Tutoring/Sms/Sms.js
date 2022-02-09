import {useEffect, useState} from "react";
import {
  CCard,
  CCardHeader,
  CDataTable,
} from "@coreui/react";
import {TableHeadersSms} from "./TableHeaders";
import {ChangeValueSms} from "./ChangeValue";
import {APIBoardcastPost} from "src/Service/APIBroadCast";
import React from "react";

const Sms = () => {
  const [tableData, setTableData] = useState([]);
  // todo
  // either use it or delete it
  // const [filterData, setFilterData] = useState({
  //   asc: false,
  //   column: "quizId",
  // });

  const updateData = () => {
    APIBoardcastPost("Main/AllSms", {
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
          //onSorterValueChange={setFilterData}
          itemsPerPage={15}
          pagination
        />
      </CCard>
    </>
  );
};

export default Sms;
