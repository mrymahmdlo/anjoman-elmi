import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardFooter,
  CCardHeader,
  CContainer,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { GetData, PostData } from "src/Service/APIEngine";
import { Toast } from "src/Utility/Toast";
import ArticleForm from "src/Content/CreateArticle/Components/ArticleForm";
import { useParams } from "react-router";
import { ChangeValues } from "./Components/ChangeValues";

const EditArticle = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);

  useEffect(() => {
    setErrorContent("تا بارگزاری داده ها کمی صبر کنید");
    setShowError(true);
    GetData("FreeContent/GetFreeContent?contentId=" + id)
      .then((res) => {
        setForm(ChangeValues(res.data));
      })
      .finally(() => {
        setShowError(false);
      });
  }, [id]);

  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    let data = form;
    if (form.Image !== "") data["image"] = form.Image;
    delete data["Image"];
    PostData("FreeContent/EditFreeContent", data)
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
        setShowError(true);
        setBtnActive(false);
      })
      .catch(() => {
        setErrorContent("خطا در ثبت ویرایش");
        setShowError(true);
        setBtnActive(false);
      });
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>
            ویرایش محتوای
            <small> متنی(مقاله)</small>
          </CCardHeader>
          <ArticleForm form={form} setForm={setForm} preData={form.image} />
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
                style={{ width: "2rem", height: "2rem" }}
                color=""
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

export default EditArticle;
