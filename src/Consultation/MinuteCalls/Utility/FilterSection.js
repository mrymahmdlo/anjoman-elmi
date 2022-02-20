import { useEffect, useState } from "react";
import MinuteCallsService from "../../Service/MinuteCallsService";
import * as React from "react";
import { CFormText, CButton, CSpinner } from "@coreui/react";

export const FilterSection = ({ setGroupId, setStatus, setRank }) => {
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    MinuteCallsService.Filters().then((res) => {
      setFilters(res.data);
    });
  }, []);
  return (
    <>
      {filters ? (
        <>
          <CFormText className="help-block">گروه درسی را انتخاب کنید</CFormText>
          {filters?.GroupIds?.options.map((item) => (
            <CButton
              color="secondary"
              className="m-1"
              key={item.id}
              value={item.id}
              onClick={(e) => setGroupId(e.target.value)}
            >
              {item.name}
            </CButton>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
            }}
          >
            <CFormText className="help-block m-2 pl-2"> وضعیت </CFormText>
            {filters?.StatusIds?.options.map((item) => (
              <CButton
                color="secondary"
                className="mr-1"
                size="small"
                key={item.id}
                value={item.id}
                onClick={(e) => setStatus(+e.target.value)}
              >
                {item.name}
              </CButton>
            ))}

            <CFormText className="help-block m-2 pl-2"> رتبه </CFormText>
            {filters?.RankRangeIds?.options.map((item) => (
              <CButton
                color="secondary"
                className="mr-1"
                size="small"
                key={item.id}
                value={item.id}
                onClick={(e) => setRank(+e.target.value)}
              >
                {item.name}
              </CButton>
            ))}
          </div>
        </>
      ) : (
        <CSpinner color="info" />
      )}
    </>
  );
};
