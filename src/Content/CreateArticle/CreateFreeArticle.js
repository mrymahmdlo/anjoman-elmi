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
import { CheckForm } from "./Components/CheckForm";
import { APICorePost } from "src/Service/APIBase";
import { ToastContext } from "src/containers/TheContent";
import { GetDotNetGeorgianFromDateJS } from "src/Utility/DateTime";
import ArticleForm from "./Components/ArticleForm";
import { useHistory } from "react-router";

const CreateFreeContent = () => {
  const now = new Date();
  const [form, setForm] = useState({
    writerProviderId: null,
    createdDateTime: GetDotNetGeorgianFromDateJS(now),
    timeToStudy: 0,
  });
  const toast = React.useContext(ToastContext);
  const [btnActice, setBtnActive] = useState(false);
  const history = useHistory();
  const submitContent = () => {
    setBtnActive(true);
    if (CheckForm(form)) {
      APICorePost("FreeContent/CreateFreeContent", form)
        .then(() => {
          toast.showToast("داده با موفقیت ثبت شد ");
          history.push("/Content/FreeContent/ManageArticles");
          setBtnActive(false);
        })
        .catch(() => {
          toast.showToast("خطا در ثبت محتوا");
          setBtnActive(false);
        });
    } else {
      toast.showToast("لطفا فیلد های ضروری را پر کنید");
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
    </div>
  );
};

export default CreateFreeContent;
