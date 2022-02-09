import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardFooter,
  CCardHeader,
  CContainer,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {CheckForm} from "./Components/CheckForm";
import { APICorePost } from "src/Service/APIBase";
import { Toast } from "src/Utility/Toast";
import { GetDotNetGeorgianFromDateJS } from "src/Utility/DateTime";
import ArticleForm from "./Components/ArticleForm";
import { useHistory } from "react-router";

const CreateFreeContent = () => {
  const now = new Date();
  const [form, setForm] = useState({
    writerProviderId: null,
    createdDateTime: GetDotNetGeorgianFromDateJS(now),
    timeToStudy:0,
  });
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [btnActice, setBtnActive] = useState(false);
  const history = useHistory();
  const submitContent = () => {
    setShowError(false);
    setBtnActive(true);
    if(CheckForm(form)){
      APICorePost("FreeContent/CreateFreeContent", form)
      .then(() => {
        setErrorContent("داده با موفقیت ثبت شد ");
        history.push("/Content/FreeContent/ManageArticles");
        setShowError(true);
        setBtnActive(false);
      })
      .catch(() => {
        setErrorContent("خطا در ثبت محتوا");
        setShowError(true);
        setBtnActive(false);
      });
    }else{
      setErrorContent("لطفا فیلد های ضروری را پر کنید");
      setShowError(true);
      setTimeout(function(){  setShowError(false);}, 1000);
      setBtnActive(false);
    }
  };

  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>
            ساخت محتوای
            <small> متنی(مقاله)</small>
          </CCardHeader>
          <ArticleForm form={form} setForm={setForm} />
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
                color="info"
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
