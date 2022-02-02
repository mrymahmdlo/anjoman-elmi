import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { GetData } from "src/Service/APIEngine";
import { Toast } from "src/Utility/Toast";
import EditTutoring from "src/Tutoring/EditTutoring/EditTutoring";

export const ManageTutoringScopedSlots = (updateData, setModal, modal, setModalTutoring) => {
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const history = useHistory();
  const handleDelete = (Id) => {
    GetData("/ProviderCourse/Remove/" + Id)
      .then(() => {
        setErrorContent("داده با موفقیت حذف شد");
        setModal(false);
      })
      .catch(() => {
        setErrorContent("خطا در حذف محتوا");
      })
      .finally(() => {
        setShowError(true);
        updateData();
      });
  };

  return {
    edit: (item, index) => (
      <>
        <td className="py-2 pl-2" key={item.productId}>
          <CButton
            className="mr-1"
            color="primary"
            onClick={() =>
                  { setModalTutoring(
                    <EditTutoring obj={item} setModal={setModal} />
                  );
              setModal(true);}
            }
          >
            <CIcon name="cil-pencil" />
          </CButton>
        </td>
      </>
    ),
    // delete: (item, index) => (
    //   <>
    //     <td className="py-2 pl-2" key={item.productId}>
    //       <CButton
    //         className="mr-1 btn btn-danger"
    //         onClick={() => {
    //           setModalTutoring(
    //             <div>
    //               <p>
    //                 آیا میخواهید {item.title} را حذف کنید؟
    //                 <CButton
    //                   color="danger"
    //                   size="sm"
    //                   className="mr-2"
    //                   onClick={() => handleDelete(item.productId)}
    //                 >
    //                   بله
    //                 </CButton>
    //               </p>
    //             </div>
    //           );
    //           setModal(!modal);
    //         }}
    //       >
    //         <CIcon name="cil-trash" />
    //       </CButton>
    //       <Toast showError={showError} errorContent={errorContent} />
    //     </td>
    //   </>
    // ),
  };
};
