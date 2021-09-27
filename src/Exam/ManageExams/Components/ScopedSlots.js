import { CButton, CProgress } from "@coreui/react";
import { useState } from "react";
import { Toast } from "src/Utility/Toast";

export const ExamScopedSlots = (updateData) => {
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  return {
    examDetail: (item, index) => (
      <>
        <td className="py-2 pl-2" key={item.orderId}>
          <CButton className="mr-1" color="info">
            جزئیات
          </CButton>
        </td>
      </>
    ),
    examEdit: (item, index) => (
      <>
        <td className="py-2 pl-2" key={item.orderId}>
          <CButton className="mr-1" color="success">
            ویرایش
          </CButton>
        </td>
      </>
    ),
    examDelete: (item, index) => (
      <>
        <td className="py-2 pl-2" key={item.orderId}>
          <CButton className="mr-1 btn btn-danger">حذف</CButton>
          <Toast showError={showError} errorContent={errorContent} />
        </td>
      </>
    ),
  };
};
