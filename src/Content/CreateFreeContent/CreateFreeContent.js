import React, { Component, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
  CInput,
  CLabel,
  CRow,
  CSelect,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { GetData, PostData } from "src/Service/APIEngine";
import { TokenManager } from "src/Identity/Service/TokenManager";
import { Toast } from "src/Utility/Toast";
import { GetDotNetGeorgianFromDateJS } from "src/Utility/DateTime";
import { FormItems } from "./Components/FormItems";
import { CKEditorFild, TextFild } from "src/Utility/InputGroup";
const CreateFreeContent = () => {
  const { GetUserId } = TokenManager();

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [timeToStudy, setTimeToStudy] = useState("");
  const [groupId, setGroupId] = useState(null);
  const [groupIds, setGroupIds] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [courseIds, setCourseIds] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);
  const writerProviderId = GetUserId();

  useEffect(() => {
    GetData("BasicInfo/Groups").then((res) => setGroupIds(res));
  }, []);

  useEffect(() => {
    if (groupId && groupId !== "")
      GetData("BasicInfo/CoursesByGroupId?groupId=" + groupId).then((res) =>
        setCourseIds(res)
      );
    else {
      setCourseIds([]);
    }
  }, [groupId]);

  const submitContent = () => {
    const now = new Date();
    console.log(GetDotNetGeorgianFromDateJS(now));
    setShowError(false);
    setBtnActive(true);
    PostData("FreeContent/CreateFreeContent", {
      description,
      writerProviderId,
      timeToStudy,
      title,
      courseId,
      groupId,
      createdDateTime: GetDotNetGeorgianFromDateJS(now),
    })
      .then((res) => {
        setErrorContent("داده با موفقیت ثبت شد ");
        setShowError(true);
        setBtnActive(false);
      })
      .catch((err) => {
        setErrorContent("لطفا فیلد های ضروری را پر کنید");
        setShowError(true);
        setBtnActive(false);
      });
  };

  const items = FormItems(
    setTitle,
    setTimeToStudy,
    setGroupId,
    groupIds,
    setCourseId,
    courseIds
  ).map((item) => TextFild(item));

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>
            ساخت محتوای
            <small> عمومی</small>
          </CCardHeader>
          <CCardBody>
            <CForm action="" method="post">
              <CRow>{items.slice(0, 2)}</CRow>
              <CRow>{items.slice(2, 4)}</CRow>
              {CKEditorFild(
                "متن محتوا",
                "لطفا متن محتوای خود را وارد کنید",
                setDescription
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
