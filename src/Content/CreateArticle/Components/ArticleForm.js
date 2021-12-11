import React, { useEffect, useState } from "react";
import { CCardBody, CCol, CForm, CRow ,CLabel} from "@coreui/react";
import { GetData } from "src/Service/APIEngine";
import { FormItems } from "./FormItems";
import { SwitchField, TextField } from "src/Utility/InputGroup";
import { CKEditorField } from "src/reusable/CKEditorInput";
import { CoreFileInput } from "src/Utility/CoreFileInput";
import { SelectProvider } from "./SelectProvider";

const ArticleForm = ({ form, setForm, preData }) => {
  const [imageHash, setImageHash] = useState("");
  const [groupIds, setGroupIds] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [providerId, setProviderId] = useState();

  useEffect(() => {
    if (form.writerProviderId) setProviderId(form.writerProviderId);
  }, [form]);

  useEffect(() => {

    setForm({ ...form, writerProviderId: providerId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerId]);

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

  const items = FormItems(form, setForm, groupIds, courseIds).map((item) =>
    TextField(item)
  );
  useEffect(() => {
    if (imageHash !== form.Image) setForm({ ...form, Image: imageHash });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageHash, form]);
  return (
    <CCardBody>
      <CForm action="" method="post">
          <CLabel className="m-2">
            در این قسمت میتوانید محتوای متنی خود را آپلود کنید. ابتدا عنوان متن و دقیقه تخمینی مطالعه آن را وارد کنید.سپس اگر محتوا از
            سمت مدیریت نوشته شده است، از قسمت ارائه دهنده "مدیریت" را انتخاب کنید در غیر این صورت نام پشتیبان های موجود در سایت در لیست داده شده است، اسم
            پشتیبان مد نظر را پیدا و انتخاب کنید.  
            اگر برای گروه آزمایشی و درس خاصی است، میتوانید از قسمت " مقطع تحصیلی " و "درس" فیلتر مد نظر خود را انتخاب کنید.
          </CLabel>
        <CRow>{items.slice(0, 2)}</CRow>
        <CRow>
          {items.slice(2, 4)}{" "}
          <CCol sm={4}>
            <SelectProvider
              providerId={providerId}
              setProviderId={setProviderId}
            />
          </CCol>
        </CRow>
        <CLabel className="m-2">
             سپس عکس محتوا را در قسمت " آپلود عکس محتوا" آپلود کنید .            درصورتی که محتوای ارائه شده ،محتوای اطلاع رسانی و مهمی میباشد. از کلید محتوای مهم، آن را فعال کنید(اگر دکمه آبی شد،فعال شده است)
          </CLabel>
        <CRow>
          {SwitchField(FormItems(form, setForm, groupIds, courseIds)[4])}
          <CoreFileInput
            preData={preData}
            title="آپلود عکس محتوا"
            setHashId={setImageHash}
            type="image/*"
          />
        </CRow>
        <CLabel className="m-2">
            در انتها متن محتوای خود را وارد کنید.
          </CLabel>
        <CKEditorField
          name="متن محتوا"
          text="لطفا متن محتوای خود را وارد کنید"
          fieldName="description"
          form={form}
          setForm={setForm}
        />
      </CForm>
    </CCardBody>
  );
};

export default ArticleForm;
