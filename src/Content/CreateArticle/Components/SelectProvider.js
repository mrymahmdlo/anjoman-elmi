import { CFormGroup, CSpinner } from "@coreui/react";
import { useEffect, useState } from "react";
import { PostData } from "src/Service/APIEngine";
import Select from "react-select";

export const SelectProvider = ({ providerId, setProviderId }) => {
  const [providers, setProviders] = useState([]);
  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 35,
      width: 200,
      minHeight: 35,
    }),
    option: (provided) => ({
      ...provided,
      textAlign: "right",
    }),
  };

  const [activeProvider, setActiveProvider] = useState(false);

  useEffect(() => {
    PostData("Provider/Consultation", {}).then((res) => {
      setProviders(res.data);
    });
  }, []);
  return (
    <CFormGroup>
      <label>ارائه دهنده</label>
      {!activeProvider ? (
        <Select
          options={providers.map((opt) => ({
            label: opt.name + " " + opt.lastName,
            value: opt.name + " " + opt.lastName,
          }))}
          defaultValue={{ label: "مدیریت", value: "مدیریت" }}
          styles={customStyles}
        />
      ) : (
        <CSpinner color="danger" variant="grow" />
      )}
      {/* <CSelect
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
      </CSelect> */}
    </CFormGroup>
  );
};
