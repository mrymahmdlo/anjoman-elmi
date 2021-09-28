import CIcon from "@coreui/icons-react";
import { CButton, CListGroup, CListGroupItem, CSpinner } from "@coreui/react";
import React, { useEffect, useState } from "react";
import ExamService from "src/Exam/ExamService/ExamService";
import { ExamContext } from "../../CreateNewExam";
import { ExamModalContainer } from "../ExamModalContainer";
import AddNewCourseForm from "./AddNewCourseForm";
import EditQuizDetailForm from "./EditQuizDetailForm";
import SwitchQuizDetails from "./SwitchQuizDetails";

export const EditableQuizDetailsLists = () => {
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const exam = React.useContext(ExamContext);

  useEffect(() => {
    ExamService.GetQuizDetails(exam.quizId).then((res) => setData(res.data));
  }, [exam.quizId]);
  useEffect(() => {
    ExamService.GetQuizDetails(exam.quizId).then((res) => setData(res.data));
    setModal(false);
    if (updated === true) {
      setUpdated(false);
    }
  }, [exam.quizId, updated]);
  return (
    <>
      <CListGroup className="w-100">
        <CListGroupItem active>
          <div className="d-flex align-items-center" s>
            <dt className="col-sm-10">زیرآزمون ها</dt>
            <dd>
              <CButton
                className="m-1"
                color="info"
                onClick={() => {
                  setModalContent(
                    <AddNewCourseForm
                      data={{ rowId: data.length + 1 }}
                      setUpdated={setUpdated}
                    />
                  );
                  setModal(!modal);
                }}
              >
                افزودن زیرآزمون
              </CButton>
            </dd>
          </div>
        </CListGroupItem>
        {!data ? (
          <CListGroupItem style={{ textAlign: "center" }}>
            <CSpinner
              style={{ width: "2rem", height: "2rem" }}
              color="primary"
              variant="grow"
            />
          </CListGroupItem>
        ) : (
          data.map((item) => (
            <CListGroupItem key={item.rowId} style={{ padding: "0px" }}>
              <div className="d-flex align-items-center">
                <dt className="col-sm-1">{item.rowId + " - "}</dt>
                <dd className="col-sm-4">{item.courseName}</dd>
                <dd className="col-sm-2">
                  {item.totalMinutes + " "}
                  دقیقه
                </dd>
                <dd className="col-sm-2">
                  {item.questionCount + " "}
                  سوال
                </dd>
                <dd className="col-sm-4">
                  <CButton
                    color="primary"
                    className="m-1"
                    onClick={() => {
                      setModalContent(
                        <EditQuizDetailForm
                          item={item}
                          setUpdated={setUpdated}
                        />
                      );
                      setModal(!modal);
                    }}
                  >
                    <CIcon name="cil-pencil" />
                  </CButton>
                  <CButton
                    color="success"
                    className="m-1"
                    onClick={() => {
                      setModalContent(
                        <SwitchQuizDetails
                          numCourses={data.length}
                          setUpdated={setUpdated}
                        />
                      );
                      setModal(!modal);
                    }}
                  >
                    <CIcon name="cil-cursor-move" />
                  </CButton>
                  <CButton
                    color="danger"
                    className="m-1"
                    onClick={() => {
                      setModalContent(
                        <div>
                          <p>
                            آیا میخواهید زیر آزمون {item.courseName} را حذف
                            کنید؟{" "}
                            <CButton
                              color="danger"
                              size="sm"
                              className="mr-2"
                              onClick={() => {
                                ExamService.DeleteQuizInfoDetails(
                                  exam.quizId,
                                  item.rowId
                                );
                                setModal(false);
                                setUpdated(true);
                                exam.setErrorContent(
                                  item.courseName + " حذف شد "
                                );
                                exam.setShowError(true);
                              }}
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
                </dd>
              </div>
            </CListGroupItem>
          ))
        )}
      </CListGroup>
      <ExamModalContainer
        name="زیر آزمون"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      />
    </>
  );
};
