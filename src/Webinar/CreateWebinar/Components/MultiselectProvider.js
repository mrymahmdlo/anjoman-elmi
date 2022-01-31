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

  useEffect(() => {
    PostData("Provider/Consultation", {}).then((res) => {
      setProviders(res.data);
    });
  }, []);

  const options = providers.map((item) => (
    {value: item.providerId, label: item.name + " " + item.lastName}
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
            defaultValue={form.providerIds}
            onChange={(e) => {
              let arry = form.providerIds;
              e
                ? arry.push(+e[e.length -1].value)
                : (arry = arry.filter((x) => x !== +e[e.length -1].value));
              setForm({
                ...form,
                providerIds: arry,
              });
            }}
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
