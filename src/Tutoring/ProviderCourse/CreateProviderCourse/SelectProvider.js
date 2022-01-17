import { CFormGroup, CSelect } from "@coreui/react";
import { useEffect, useState } from "react";
import { PostData } from "src/Service/APIEngine";
import Select from "react-select";

export const SelectProvider = ({ providerId, setProviderId }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 35,
      width: 340,
      minHeight: 35,
    }),
    option: (provided) => ({
      ...provided,
      textAlign: "right",
    }),
  };

  const [providers, setProviders] = useState([]);

  useEffect(() => {
    PostData("Provider/Tutoring", {}).then((res) => {
      setProviders(res.data);
    });
  }, []);
  return (
    <CFormGroup>
      <label>ارائه دهنده</label>
      <Select
        options={providers.map((opt) => ({
          label: opt.name + " " + opt.lastName,
          value: opt.name + " " + opt.lastName,
        }))}
        defaultValue={{ label: "ارائه دهنده را انتخاب کنید" }}
        styles={customStyles}
      />
    </CFormGroup>
  );
};
