import { CButton } from "@coreui/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ExamService from "src/Exam/ExamService/ExamService";
import { Toast } from "src/Utility/Toast";

export const ExamScopedSlots = (
  updateData,
  setModal,
  modal,
  setModalContent
) => {
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const history = useHistory();
  const handleDelete = (quizId) => {
    ExamService.DeleteQuiz(quizId)
      .then((res) => {
        setErrorContent(res.message);
      })
      .catch((err) => {
        setErrorContent(err.message);
      })
      .finally(() => {
        setShowError(true);
        updateData();
      });
  };

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
        <td className="py-2 pl-2" key={item.quizId}>
          <CButton
            className="mr-1"
            color="success"
            onClick={() => history.push("/")}
          >
            ویرایش
          </CButton>
        </td>
      </>
    ),
    examDelete: (item, index) => (
      <>
        <td className="py-2 pl-2" key={item.quizId}>
          <CButton
            className="mr-1 btn btn-danger"
            onClick={() => {
              setModalContent(
                <div>
                  <p>
                    آیا میخواهید آزمون {item.quizTitle} را حذف کنید؟
                    <CButton
                      color="danger"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleDelete(item.quizId)}
                    >
                      بله
                    </CButton>
                  </p>
                </div>
              );
              setModal(!modal);
            }}
          >
            حذف
          </CButton>
          <Toast showError={showError} errorContent={errorContent} />
        </td>
      </>
    ),
  };
};
