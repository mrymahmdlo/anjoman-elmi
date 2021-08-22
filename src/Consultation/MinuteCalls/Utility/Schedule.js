import { useEffect, useState } from "react";
import { GetData } from "src/Service/APIConfig";
import { DotNetGeorgianToHejri } from "src/Utility/DateTime";

const { CFormText, CButton, CSpinner } = require("@coreui/react");

export const Schedule = ({ orderDetailId }) => {
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    if (orderDetailId)
      GetData("Order/Schedule/" + orderDetailId).then((res) => {
        setSchedule(res.data);
      });
  }, [orderDetailId]);
  return (
    <>
      {schedule ? (
        <>
          <CFormText className="help-block">برنامه هفتگی مشاور</CFormText>
          {schedule?.items?.map((item) => (
            <CButton key={item.id} value={item.id}>
              {item.name}{" "}
              {DotNetGeorgianToHejri(item.startDateTime).split(" ")[0]}
            </CButton>
          ))}
        </>
      ) : (
        <CSpinner color="info" />
      )}
    </>
  );
};
