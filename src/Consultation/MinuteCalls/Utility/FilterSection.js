import { useEffect, useState } from "react";
import { GetData } from "../../../service/APIConfig";

const { CFormText, CButton, CSpinner } = require("@coreui/react");

export const FilterSection = ({ setGroupId, setStatus, setRank }) => {
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    GetData("Provider/Filters").then((res) => {
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
          <CFormText className="help-block">
            {" "}
            وضعیت پشتیبان را انتخاب کنید
          </CFormText>
          {filters?.StatusIds?.options.map((item) => (
            <CButton
              color="secondary"
              className="m-1"
              key={item.id}
              value={item.id}
              onClick={(e) => setStatus(+e.target.value)}
            >
              {item.name}
            </CButton>
          ))}

          <CFormText className="help-block">
            {" "}
            رتبه پشتیبان را انتخاب کنید
          </CFormText>
          {filters?.RankRangeIds?.options.map((item) => (
            <CButton
              color="secondary"
              className="m-1"
              key={item.id}
              value={item.id}
              onClick={(e) => setRank(+e.target.value)}
            >
              {item.name}
            </CButton>
          ))}
        </>
      ) : (
        <CSpinner color="info" />
      )}
    </>
  );
};
