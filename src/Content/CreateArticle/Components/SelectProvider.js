import { CFormGroup, CSelect } from "@coreui/react";
import { useEffect, useState } from "react";
import { APICorePost } from "src/Service/APIBase";
import * as React from "react";

export const SelectProviderCreateArticle = ({ providerId, setProviderId }) => {
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    APICorePost("Provider/Consultation").then((res) => {
      setProviders(res.data);
    });
  }, []);
  return (
    <CFormGroup>
      <label>ارائه دهنده</label>
      <CSelect
        value={providerId}
        onChange={(e) =>
          e.target.value === "0"
            ? setProviderId(null)
            : setProviderId(e.target.value)
        }
      >
        <option value={0}>مدیریت</option>
        {providers.length > 0 ? (
          providers.map((item) => (
            <option value={item.providerId} key={item.providerId}>
              {item.name + " " + item.lastName}
            </option>
          ))
        ) : (
          <option>پشتیبانی وجود ندارد</option>
        )}
      </CSelect>
    </CFormGroup>
  );
};
