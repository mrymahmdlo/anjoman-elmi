import { useEffect, useState } from "react";
import { PostData } from "src/Service/APIEngine";
import Select from "react-select";
const {
  CCol,
  CFormGroup,
  CLabel,
  CFormText,
} = require("@coreui/react");

const MultiselectProvider = ({ form, setForm }) => {
  const [providers, setProviders] = useState([]);
  const [providerId, setProviderId] = useState();

  useEffect(() => {
    PostData("Provider/Consultation", {}).then((res) => {
      setProviders(res.data);
    });
  }, []);

  useEffect(() => {
    setForm({
      ...form,
      providerId: providerId,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerId]);

  const options = providers.map((item) => (
    {value: item.providerId, providerId: item.providerId, label: item.name + " " + item.lastName}
  ));  

  return (
    <>
      <CCol sm="6">
        <CFormGroup>
          <CLabel htmlFor="nf-title">مشاور را انتخاب کنید</CLabel>
          <Select
            isSearchable
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            options={options}
            onChange={setProviderId}
          /
          >
          <CFormText className="help-block">
            {" "}
            تا لود شدن مشاور ها منتظر بمانید
          </CFormText>
        </CFormGroup>
      </CCol>
    </>
  );
};

export { MultiselectProvider };
