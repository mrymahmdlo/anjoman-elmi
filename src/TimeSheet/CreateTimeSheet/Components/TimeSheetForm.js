// import React, { useEffect, useState } from "react";
// import { CCardBody, CCol, CForm, CRow ,CLabel} from "@coreui/react";
// import { PostDataProvider } from "src/Service/APIProvider";
// import { FormItems } from "./FormItems";
// import { SwitchField, TextField } from "src/Utility/InputGroup";
// import { CKEditorField } from "src/reusable/CKEditorInput";
// import { CoreFileInput } from "src/Utility/CoreFileInput";
// import { SelectProvider } from "./SelectProvider";
//
// const TimeSheetForm = ({ form, setForm, preData }) => {
//   // const [imageHash, setImageHash] = useState("");
//   const [providerId, setProviderId] = useState();
//   const [start, setStart] = useState([]);
//   const [end, setEnd] = useState([]);
//
//   useEffect(() => {
//     if (form.providerId) setProviderId(form.providerId);
//   }, [form]);
//
//   useEffect(() => {
//
//     setForm({ ...form, providerId: providerId });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [providerId]);
//
//   useEffect(() => {
//     if (form.start) setStart(form.start);
//   }, [form]);
//
//   useEffect(() => {
//
//     setForm({ ...form, start: start });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [start]);
//
//   useEffect(() => {
//     if (form.end) setEnd(form.end);
//   }, [form]);
//
//   useEffect(() => {
//
//     setForm({ ...form, end: end });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [end]);
//
//   // useEffect(() => {
//   //   PostDataProvider("BasicInfo/Groups").then((res) => setStart(res));
//   // }, []);
//   //
//   // useEffect(() => {
//   //   if (form.groupId && form.groupId !== "")
//   //     PostDataProvider("BasicInfo/CoursesByGroupId?groupId=" + form.groupId).then(
//   //       (res) => setEnd(res)
//   //     );
//   //   else {
//   //     setEnd([]);
//   //   }
//   // }, [form.groupId]);
//
//   const items = FormItems(form, setForm, start, end).map((item) =>
//     TextField(item)
//   );
//   // useEffect(() => {
//   //   if (imageHash !== form.Image) setForm({ ...form, Image: imageHash });
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [imageHash, form]);
//   return (
//     <CCardBody>
//       <CForm action="" method="post">
//         <CLabel className="m-2">
//           در این قسمت میتوانید محتوای متنی خود را آپلود کنید. ابتدا عنوان متن و دقیقه تخمینی مطالعه آن را وارد کنید.سپس اگر محتوا از
//           سمت مدیریت نوشته شده است، از قسمت ارائه دهنده "مدیریت" را انتخاب کنید در غیر این صورت نام پشتیبان های موجود در سایت در لیست داده شده است، اسم
//           پشتیبان مد نظر را پیدا و انتخاب کنید.
//           اگر برای گروه آزمایشی و درس خاصی است، میتوانید از قسمت " مقطع تحصیلی " و "درس" فیلتر مد نظر خود را انتخاب کنید.
//         </CLabel>
//         <CRow>{items.slice(0, 2)}</CRow>
//         <CRow>
//           {items.slice(2, 4)}{" "}
//           <CCol sm={4}>
//             <SelectProvider
//               providerId={providerId}
//               setProviderId={setProviderId}
//             />
//           </CCol>
//         </CRow>
//         <CLabel className="m-2">
//           سپس عکس محتوا را در قسمت " آپلود عکس محتوا" آپلود کنید .            درصورتی که محتوای ارائه شده ،محتوای اطلاع رسانی و مهمی میباشد. از کلید محتوای مهم، آن را فعال کنید(اگر دکمه آبی شد،فعال شده است)
//         </CLabel>
//         <CRow>
//           {SwitchField(FormItems(form, setForm, start, end)[4])}
//           {/*<CoreFileInput*/}
//           {/*  preData={preData}*/}
//           {/*  title="آپلود عکس محتوا"*/}
//           {/*  setHashId={setImageHash}*/}
//           {/*  type="image/*"*/}
//           {/*/>*/}
//         </CRow>
//         <CLabel className="m-2">
//           در انتها متن محتوای خود را وارد کنید.
//         </CLabel>
//         <CKEditorField
//           name="متن محتوا"
//           text="لطفا متن محتوای خود را وارد کنید"
//           fieldName="description"
//           form={form}
//           setForm={setForm}
//         />
//       </CForm>
//     </CCardBody>
//   );
// };
//
// export default TimeSheetForm;
