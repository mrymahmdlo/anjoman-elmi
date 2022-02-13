import CIcon from "@coreui/icons-react";
import { CBadge, CButton } from "@coreui/react";
import { useHistory } from "react-router-dom";
import ExamService from "../../ExamService/ExamService";
import { ToastContext } from "src/containers/TheContent";
import ExamDetails from "./ExamDetails";
import * as React from "react";

export const ExamScopedSlots = (
  updateData,
  setModal,
  modal,
  setModalContent,
  tableFields
) => {
  const toast = React.useContext(ToastContext);
  const history = useHistory();
  const handleDelete = (quizId) => {
    ExamService.DeleteQuiz(quizId)
      .then((res) => {
        toast.showToast(res.message);
        setModal(false);
      })
      .catch((err) => {
        toast.showToast(err.message);
      })
      .finally(() => {
        updateData();
      });
  };

  return {
    quizCreationStatus: (item) => {
      return (
        <td className="py-2 pl-2">
          <CBadge
            style={{ direction: "ltr" }}
            color={
              item.quizCreationStatus === "آماده ی شرکت" ? "success" : "danger"
            }
          >
            {item.quizCreationStatus}
          </CBadge>
        </td>
      );
    },
    quizMode: (item) => {
      return (
        <td className="py-2 pl-2">
          <CBadge
            style={{ direction: "ltr" }}
            color={
              item.quizMode === "سوال به سوال"
                ? "dark"
                : item.quizMode === "pdf فایل"
                ? "light"
                : "primary"
            }
          >
            {item.quizMode}
          </CBadge>
        </td>
      );
    },
    examDetail: (item) => (
      <>
        <td className="py-2 pl-2" key={item.orderId}>
          <CButton
            className="mr-1"
            color="dark"
            onClick={() => {
              setModalContent(
                <ExamDetails item={item} tableFields={tableFields} />
              );
              setModal(!modal);
            }}
          >
            <CIcon name="cil-laptop" />
          </CButton>
        </td>
      </>
    ),
    examEdit: (item) => (
      <>
        <td className="py-2 pl-2" key={item.quizId}>
          <CButton
            className="mr-1"
            color="primary"
            onClick={() =>
              history.push("/Exams/EditExam/EditQuizInfo/" + item.quizId)
            }
          >
            <CIcon name="cil-pencil" />
          </CButton>
        </td>
      </>
    ),
    examDelete: (item) => (
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
            <CIcon name="cil-trash" />
          </CButton>
        </td>
      </>
    ),
  };
};
