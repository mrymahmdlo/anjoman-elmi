import { CFormGroup, CSelect } from "@coreui/react";
import { useEffect, useState } from "react";
import { APICorePost } from "src/Service/APIBase";

export const SelectProviderWebinar = ({ providerId, setProviderId }) => {
  const [providers, setProviders] = useState([]);
  console.log(providerId);
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
        onChange={(e) => setProviderId(e.target.value)}
      >
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
