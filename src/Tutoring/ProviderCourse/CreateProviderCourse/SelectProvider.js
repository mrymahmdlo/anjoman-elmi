import { CFormGroup, CSelect } from "@coreui/react";
import { useEffect, useState } from "react";
import { APICorePost } from "src/Service/APIBase";

export const SelectProviderProviderCourse = ({ providerId, setProviderId }) => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    APICorePost("Provider/Tutoring").then((res) => {
      setProviders(res.data);
    });
  }, []);
  return (
    <CFormGroup>
      <label>ارائه دهنده</label>
      <CSelect
        value={providerId}
        onChange={(e) =>
          setProviderId(Number(e.target.value))
        }
      >
        <option value={-1}>ارائه دهنده را انتخاب کنید</option>
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
