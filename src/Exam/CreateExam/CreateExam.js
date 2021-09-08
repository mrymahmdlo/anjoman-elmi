import React, { useEffect, useState } from "react";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CFormText,
  CLabel,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { GetData, PostData } from "src/Service/APIEngine";
import { Toast } from "src/Utility/Toast";
import { TokenManager } from "src/Identity/Service/TokenManager";
import { GroupIdSelect, InfoFormItems } from "./Components/InfoFormItems";
import { CKEditorFild, SwitchFild, TextFild } from "../../Utility/InputGroup";

const CreateExam = () => {
  const { GetUserId } = TokenManager();

  const [form, setForm] = useState({
    UserId: GetUserId(),
    IsLock: false,
    IsValid: false,
  });

  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);
  const [groupIds, setGroupIds] = useState([]);

  useEffect(() => {
    GetData("BasicInfo/Groups").then((res) => setGroupIds(res));
  }, []);
  useEffect(() => {}, []);
  const items = InfoFormItems(form, setForm).map((item) => TextFild(item));
  const switches = InfoFormItems(form, setForm)
    .slice(8, 14)
    .map((item) => SwitchFild(item));
  const submitContent = () => {};
  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>
            ایجاد آزمون جدید /<small> تعریف اطلاعات</small>
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post">
              <CRow>{items.slice(0, 3)}</CRow>
              <CRow>
                {GroupIdSelect(groupIds)}
                {items.slice(3, 5)}
              </CRow>
              <CRow>{items.slice(5, 8)}</CRow>
              <CRow>{switches}</CRow>
              {CKEditorFild(
                "توضیحات آزمون",
                "لطفا درمورد آزمون توضیحات لازم را بنویسید",
                setForm,
                form
              )}
            </CForm>
          </CCardBody>
          <CCardFooter>
            {!btnActice ? (
              <CButton
                type="submit"
                size="sm"
                color="primary"
                onClick={submitContent}
              >
                <CIcon name="cil-scrubber" /> ثبت آزمون و مرحله بعد
              </CButton>
            ) : (
              <CSpinner
                style={{ width: "4rem", height: "4rem" }}
                color="danger"
                variant="grow"
              />
            )}
          </CCardFooter>
        </CCard>
      </CContainer>
      <Toast showError={showError} errorContent={errorContent} />
    </div>
  );
};

export default CreateExam;
