// import { CFormGroup, CSelect } from "@coreui/react";
// import { useEffect, useState } from "react";
// import { PostDataProvider } from "src/Service/APIProvider";
//
// export const SelectProvider = ({ providerId, setProviderId }) => {
//   const [providers, setProviders] = useState([]);
//
//   useEffect(() => {
//     PostDataProvider("Provider/Consultation", {}).then((res) => {
//       setProviders(res.data);
//       console.log(res.data);
//     });
//   }, []);
//   return (
//     <CFormGroup>
//       <label>ارائه دهنده</label>
//       <CSelect
//         value={providerId}
//         onChange={(e) =>
//           e.target.value === "0"
//             ? setProviderId(null)
//             : setProviderId(e.target.value)
//         }
//       >
//         <option value={0}>مدیریت</option>
//         {providers.length > 0 ? (
//           providers.map((item) => (
//             <option value={item.providerId} key={item.providerId}>
//               {item.name + " " + item.lastName}
//             </option>
//           ))
//         ) : (
//           <option>پشتیبانی وجود ندارد</option>
//         )}
//       </CSelect>
//     </CFormGroup>
//   );
// };
