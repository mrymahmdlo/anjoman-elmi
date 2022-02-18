import React from "react";
import { CCardBody, CForm, CRow } from "@coreui/react";
import { FormItemsDownloadExcel } from "./FormItems";
import { TextField } from "src/Utility/InputGroup";
import { useEffect, useState } from "react";
import { APIBoardcastGet } from "src/Service/APIBroadCast";
import Select from "react-select";
import { CCol, CFormGroup, CLabel, CFormText } from "@coreui/react";

const DownloadExcelForm = ({ form, setForm }) => {
  const items = FormItemsDownloadExcel(form, setForm).map((item) => TextField(item));
  const [subscriptions, setSubscriptions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    APIBoardcastGet("webinar/GetWebinarList").then((res) => {
      setSubscriptions(res.data);
    });
  }, [form.groupId]);

  const options = subscriptions.map((item) => ({
    value: +item.id,
    label: item.title,
  }));

  return (
    <CCardBody>
      <CForm action="" method="post">
        <CRow>
          <CCol sm="6">
            <CFormGroup>
              <CLabel htmlFor="nf-title">همایش های مورد نظر را انتخاب کنید</CLabel>
              <Select
                isSearchable
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
                options={options}
                value={selected}
                onChange={(e) => {
                  setSelected(e);
                  let arry = e ? e.map((item) => item.value) : null;
                  setForm({
                    ...form,
                    webinarIds: arry,
                  });
                }}
              />
              <CFormText className="help-block">
                {" "}
                لطفاً تا لود شدن همایش ها منتظر بمانید
              </CFormText>
            </CFormGroup>
          </CCol>
          <CCol>{items}</CCol>
          {console.log(items)}
        </CRow>
      </CForm>
    </CCardBody>
  );
};

export { DownloadExcelForm };
