import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CContainer,
  CForm,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { GetData, PostData } from "src/Service/APIEngine";
import { TokenManager } from "src/Identity/Service/TokenManager";
import { Toast } from "src/Utility/Toast";
import { GetDotNetGeorgianFromDateJS } from "src/Utility/DateTime";
import { FormItems } from "./Components/FormItems";
import { SwitchField, TextField } from "src/Utility/InputGroup";
import { CKEditorField } from "src/reusable/CKEditorInput";
import { CoreFileInput } from "src/Utility/CoreFileInput";

const CreateFreeContent = () => {
  const { GetUserId } = TokenManager();
  const now = new Date();
  const [imageHash, setImageHash] = useState("");
  const [form, setForm] = useState({
    writerProviderId: GetUserId(),
    createdDateTime: GetDotNetGeorgianFromDateJS(now),
  });
  const [groupIds, setGroupIds] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);

  useEffect(() => {
    GetData("BasicInfo/Groups").then((res) => setGroupIds(res));
  }, []);

  useEffect(() => {
    if (form.groupId && form.groupId !== "")
      GetData("BasicInfo/CoursesByGroupId?groupId=" + form.groupId).then(
        (res) => setCourseIds(res)
      );
    else {
      setCourseIds([]);
    }
  }, [form.groupId]);

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    PostData("FreeContent/CreateFreeContent", form)
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
        setShowError(true);
        setBtnActive(false);
      })
      .catch(() => {
        setErrorContent("لطفا فیلد های ضروری را پر کنید");
        setShowError(true);
        setBtnActive(false);
      });
  };

  const items = FormItems(form, setForm, groupIds, courseIds).map((item) =>
    TextField(item)
  );
  useEffect(() => {
    if(imageHash !== form.image) setForm({ ...form, image: imageHash });
  }, [imageHash,form]);
  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>
            ساخت محتوای
            <small> متنی(مقاله)</small>
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post">
              <CRow>{items.slice(0, 2)}</CRow>
              <CRow>{items.slice(2, 4)}</CRow>
              <CRow>
                {SwitchField(FormItems(form, setForm, groupIds, courseIds)[4])}
                <CoreFileInput
                  title="آپلود عکس محتوا"
                  setHashId={setImageHash}
                  type="image/*"
                />
              </CRow>
              <CKEditorField
                name="متن محتوا"
                text="لطفا متن محتوای خود را وارد کنید"
                fieldName="description"
                form={form}
                setForm={setForm}
              />
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
                <CIcon name="cil-scrubber" /> ثبت محتوا
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

export default CreateFreeContent;
