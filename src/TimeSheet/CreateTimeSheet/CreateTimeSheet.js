// import React, { useState } from "react";
// import {
//   CButton,
//   CCard,
//   CCardFooter,
//   CCardHeader,
//   CContainer,
//   CSpinner,
// } from "@coreui/react";
// import CIcon from "@coreui/icons-react";
// import {CheckForm} from "./Components/CheckForm";
// import { PostDataProvider } from "src/Service/APIProvider";
// import { Toast } from "src/Utility/Toast";
// import TimeSheetForm from "./Components/TimeSheetForm";
// import { useHistory } from "react-router";
//
const CreateTimeSheet = () => {
//   const [form, setForm] = useState({
//     providerId: null,
//   });
//   const [showError, setShowError] = useState(false);
//   const [errorContent, setErrorContent] = useState("");
//   const [btnActive, setBtnActive] = useState(false);
//   const history = useHistory();
//   const submitContent = () => {
//     setShowError(false);
//     setBtnActive(true);
//     if(CheckForm(form)){
//       PostDataProvider("TimeSheet/AddTimeSheet", form)
//         .then(() => {
//           setErrorContent("داده با موفقیت ثبت شد ");
//           history.push("/TimeSheet/ManageTimeSheet");
//           setShowError(true);
//           setBtnActive(false);
//         })
//         .catch(() => {
//           setErrorContent("خطا در ثبت محتوا");
//           setShowError(true);
//           setBtnActive(false);
//         });
//     }else{
//       setErrorContent("لطفا فیلد های ضروری را پر کنید");
//       setShowError(true);
//       setTimeout(()=>setShowError(false), 1000);
//       setBtnActive(false);
//     }
//   };
//
  return (
    <div>txcyvb</div>
//     <div className="App">
//       <CContainer fluid>
//         <CCard>
//           <CCardHeader>ایجاد زمان بندی</CCardHeader>
//           <TimeSheetForm form={form} setForm={setForm} />
//           <CCardFooter>
//             {!btnActive ? (
//               <CButton
//                 type="submit"
//                 size="sm"
//                 color="primary"
//                 onClick={submitContent}
//               >
//                 <CIcon name="cil-scrubber" /> ثبت محتوا
//               </CButton>
//             ) : (
//               <CSpinner
//                 style={{ width: "2rem", height: "2rem" }}
//                 color="info"
//                 variant="grow"
//               />
//             )}
//           </CCardFooter>
//         </CCard>
//       </CContainer>
//       <Toast showError={showError} errorContent={errorContent} />
//     </div>
  );
};

export default CreateTimeSheet;
