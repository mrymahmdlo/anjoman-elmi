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
import { GetData, PostData } from "src/Service/APIConfig";
import { TokenManager } from "src/Identity/Service/TokenManager";
import { Toast } from "src/Utility/Toast";
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
    setShowError(false);
    setBtnActive(true);
    PostData("FreeContent/CreateFreeContent", {
      description,
      writerProviderId,
      timeToStudy,
      title,
      courseId,
      groupId,
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
              <CRow>
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel htmlFor="nf-title">عنوان محتوای عمومی</CLabel>
                    <CInput
                      type="text"
                      name="title"
                      placeholder="عنوان"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <CFormText className="help-block">
                      عنوان محتوای خود را وارد کنید
                    </CFormText>
                  </CFormGroup>
                </CCol>
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel htmlFor="nf-timeToStudy">
                      زمان تقریبی مطالعه مقاله
                    </CLabel>
                    <CInput
                      type="text"
                      name="timeToStudy"
                      placeholder="زمان مطالعه"
                      onChange={(e) => setTimeToStudy(e.target.value)}
                    />
                    <CFormText className="help-block">
                      زمان تقریبی به دقیقه برای خواندن این محتوا را تعیین کنید.
                    </CFormText>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel htmlFor="nf-title">مقطع تحصیلی</CLabel>
                    <CFormGroup row>
                      <CSelect
                        custom
                        name="groupId"
                        style={{ width: "80%", marginRight: "15px" }}
                        onChange={(e) => setGroupId(e.target.value)}
                      >
                        <option value={""}>همه</option>
                        {groupIds.map((item, key) => (
                          <option key={key} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </CSelect>
                    </CFormGroup>
                    <CFormText className="help-block">
                      مقطع تحصیلی مخاطب این محتوا را وارد کنید
                    </CFormText>
                  </CFormGroup>
                </CCol>
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel htmlFor="nf-timeToStudy">درس</CLabel>
                    <CFormGroup row>
                      <CSelect
                        custom
                        name="courseId"
                        style={{ width: "80%", marginRight: "15px" }}
                        onChange={(e) => setCourseId(e.target.value)}
                      >
                        <option value={null}>همه</option>
                        {courseIds.length > 0
                          ? courseIds.map((item, key) => (
                              <option key={key} value={item.id}>
                                {item.name}
                              </option>
                            ))
                          : null}
                      </CSelect>
                    </CFormGroup>
                    <CFormText className="help-block">
                      درس مربوطه به این محتوا را انتخاب کنید
                    </CFormText>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CFormGroup>
                <CLabel htmlFor="nf-password">افزودن محتوای جدید</CLabel>
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    language: "fa",
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "|",
                      "bulletedList",
                      "numberedList",
                      "|",
                      "indent",
                      "outdent",
                      "alignment",
                      "|",
                      // "imageUpload",
                      "blockQuote",
                      "insertTable",
                      // "mediaEmbed",
                      "|",
                      "undo",
                      "redo",
                    ],
                  }}
                  data=""
                  onInit={(editor) => {
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                  }}
                />
                <CFormText className="help-block">
                  لطفا متن محتوای خود را وارد کنید
                </CFormText>
              </CFormGroup>
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
