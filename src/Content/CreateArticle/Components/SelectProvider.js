import { CFormGroup, CSelect } from "@coreui/react";
import { useEffect, useState } from "react";
import { PostData } from "src/Service/APIEngine";

export const SelectProvider = ({ providerId, setProviderId }) => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    PostData("Provider/Consultation", {}).then((res) => {
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
        <option value={null}>مدیریت</option>
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
