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
import { APICoreGet, APICoreFormData } from "src/Service/APIBase";
import { ToastContext } from "src/containers/TheContent";
import ArticleForm from "../CreateArticle/Components/ArticleForm";
import { useHistory, useParams } from "react-router";
import { ChangeValuesEditArticles } from "./Components/ChangeValues";
import { GetDotNetGeorgianFromDateJS } from "src/Utility/DateTime";

const EditArticle = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [btnActice, setBtnActive] = useState(false);
  const history = useHistory();
  const toast = React.useContext(ToastContext);

  useEffect(() => {
    toast.showToast("تا بارگزاری داده ها کمی صبر کنید");
    APICoreGet("FreeContent/GetFreeContent?contentId=" + id)
      .then((res) => {
        setForm(ChangeValuesEditArticles(res.data));
      })
      .finally(() => {
      });
  }, [id]);

  const submitContent = () => {
    setBtnActive(true);
    const now = new Date();

    if (!form.writerProviderId) delete form["writerProviderId"];
    if (!form.image) {
      delete form["image"];
    }
    if (form.Image !== "") {
      form["image"] = form["Image"];
    }

    form["group"] = form["groupId"];
    form["course"] = form["courseId"];
    delete form["groupId"];
    delete form["courseId"];
    delete form["Image"];
    delete form["imageLink"];

    APICoreFormData("FreeContent/EditFreeContent", {
      ...form,
      createdDateTime: GetDotNetGeorgianFromDateJS(now),
    })
      .then(() => {
        toast.showToast("داده با موفقیت ثبت شد ");
        history.push("/Content/FreeContent/ManageArticles");
        setBtnActive(false);
      })
      .catch(() => {
        toast.showToast("خطا در ثبت ویرایش");
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
          <ArticleForm form={form} setForm={setForm} preData={form.imageLink} />
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
    </div>
  );
};

export default EditArticle;
