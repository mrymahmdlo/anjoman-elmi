import { useEffect, useState } from "react";
import MinuteCallsService from "../../Service/MinuteCallsService";
import { DotNetGeorgianToHejri } from "src/Utility/DateTime";
import * as React from "react";
// todo
// change it to import
const { CFormText, CButton, CSpinner } = require("@coreui/react");

export const Schedule = ({ providerId, setForm, form }) => {
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    if (providerId)
      MinuteCallsService.GetSchedule(providerId).then((res) => {
        setSchedule(res.data);
      });
  }, [providerId]);
  return (
    <>
      {schedule ? (
        <>
          <CFormText className="help-block">برنامه هفتگی مشاور</CFormText>
          {schedule?.map((item) => (
            <CButton
              key={item.id}
              onClick={() =>
                setForm({
                  ...form,
                  reserveDate: DotNetGeorgianToHejri(item.startDateTime),
                })
              }
              value={item.id}
              style={{
                border: "1px solid #ddd",
                margin: "1px",
              }}
            >
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
