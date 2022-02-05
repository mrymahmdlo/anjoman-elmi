import { useEffect, useState } from "react";
import { PostData } from "src/Service/APIEngine";
import Select from "react-select";
const { CCol, CFormGroup, CLabel, CFormText } = require("@coreui/react");

const MultiselectProvider = ({ form, setForm }) => {
  const [providers, setProviders] = useState([]);
  const [selected, setSelected] = useState([]);
  console.log('for',form)
  // const [providerIds, setProviderIds] = useState([]);

  // GetDataBroad("Webinar/GetAll").then((res) => {
  //   setProviderIds(res.data.productProvider);
  // });

  useEffect(() => {
    PostData("Provider/Consultation", {}).then((res) => {
      setProviders(res.data);
    });
  }, []);

  const options = providers.map((item) => ({
    value: item.providerId,
    label: item.name + " " + item.lastName,
  }));

  const defaultValue = form.providerIds.map((item) => ({
    value: item.userId,
    label: item.name + " " + item.lastName,
  }));

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
            value={
              selected.length === 0 
                ? defaultValue.map((i) => i)
                : selected
            }
            onChange={(e) => {
              setSelected(e);
              var arry = e.map(function (item) {
                return item.value;
              });
              setForm({
                ...form,
                providerIds: arry,
              });
            }}
          />
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
