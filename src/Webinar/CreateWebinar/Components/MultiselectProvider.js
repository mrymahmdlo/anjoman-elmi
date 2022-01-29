import { useEffect, useState } from "react";
import { PostData } from "src/Service/APIEngine";
const {
    CCol,
    CFormGroup,
    CLabel,
    CInputCheckbox,
    CFormText,
  } = require("@coreui/react");

const MultiselectProvider = ({form, setForm}) => {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        PostData("Provider/Consultation", {}).then((res) => {
        setProviders(res.data);
        });
    }, []);

    return (
      <CCol sm="4">
        <CFormGroup>
          <CLabel htmlFor="nf-title">مشاور را انتخاب کنید</CLabel>
          {providers.map((item, key) => (
            <>
              <CFormGroup key={key} variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id={"checkbox-" + key}
                  name="checkbox1"
                  value={item.providerId}
                  checked={form?.providerId?.includes(+item.providerId)}
                  onChange={(e) => {
                    let arry = form.providerId;
                    e.target.checked
                      ? arry.push(+e.target.value)
                      : (arry = arry.filter((x) => x !== +e.target.value));
                    setForm({
                      ...form,
                      providerId: arry,
                    });
                  }}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label"
                  htmlFor="checkbox1"
                >
                  {item.name + " " + item.lastName}
                </CLabel>
              </CFormGroup>
            </>
          ))}
          <CFormText className="help-block">
            {" "}
            تا لود شدن مشاور ها منتظر بمانید
          </CFormText>
        </CFormGroup>
      </CCol>
    );
  };

export {MultiselectProvider};