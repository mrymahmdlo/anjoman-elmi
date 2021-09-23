import CIcon from "@coreui/icons-react";
import { CButton, CListGroup, CListGroupItem, CSpinner } from "@coreui/react";
import React, { useEffect, useState } from "react";
import ExamService from "src/Exam/ExamService/ExamService";
import { ExamContext } from "../../CreateNewExam";
import { ExamModalContainer } from "../ExamModalContainer";
import AddQuestionForm from "./AddQuestionForm";
import EditQuestionForm from "./EditQuestionForm";
import PreviewQuestion from "./PreviewQuestion";

export const EditableQuestionList = () => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [updated, setUpdated] = useState(false);
  const [data, setData] = useState();
  const exam = React.useContext(ExamContext);

  const popUpPreview = (item) => {
    var question = window.open(
      "",
      "wildebeast",
      "width=1000,height=500,scrollbars=1,resizable=1"
    );

    var html = PreviewQuestion(item);

    question.document.open();
    question.document.write(html);
    question.document.close();
  };

  useEffect(() => {
    ExamService.GetQuestions(exam.quizId).then((res) => setData(res.data));
    if (modal === false) {
      setModalContent(null);
    }
    if (updated === true) {
      setUpdated(false);
      setModal(false);
    }
  }, [updated, exam.quizId, modal]);
  return (
    <>
      <CListGroup className="w-100">
        <CListGroupItem active>
          <div className="d-flex align-items-center">
            <dt className="col-sm-9">سوالات آزمون</dt>
            <dd
              style={{ textOverflow: 'ellipsis "[..]"', marginRight: "55px" }}
            >
              <CButton
                color="info"
                onClick={() => {
                  setModalContent(
                    <AddQuestionForm
                      numQ={data.length + 1}
                      setUpdated={setUpdated}
                    ></AddQuestionForm>
                  );
                  setModal(!modal);
                }}
              >
                افزودن سوال
              </CButton>
              <CButton
                className="m-1"
                color="light"
                onClick={() => {}}
                disabled
              >
                نمایش آزمون
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
          data.map((item, i) => (
            <CListGroupItem key={i} style={{ paddingTop: 0, paddingBottom: 0 }}>
              <div className="d-flex align-items-center">
                <dt className="col-sm-1">{item.questionNo + " - "}</dt>
                <dd
                  className="col-sm-9"
                  style={{
                    maxHeight: "40px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <p
                    className="ck-content"
                    dangerouslySetInnerHTML={{ __html: item.questionText }}
                  ></p>
                </dd>
                <dd className="col-sm-2">
                  <CButton
                    color="primary"
                    className="m-1"
                    onClick={() => {
                      setModalContent(
                        <EditQuestionForm item={item} setUpdated={setUpdated} />
                      );
                      setModal(!modal);
                    }}
                  >
                    <CIcon name="cil-pencil" />
                  </CButton>
                  <CButton
                    className="m-1"
                    color="success"
                    onClick={() => popUpPreview(item)}
                  >
                    <CIcon name="cil-laptop" />
                  </CButton>
                  <CButton
                    color="danger"
                    className="m-1"
                    onClick={() => {
                      setModalContent(
                        <div>
                          <p>
                            یا میخواهید سوال {item.questionNo} را حذف کنید؟
                            <CButton
                              color="danger"
                              size="sm"
                              className="mr-3"
                              onClick={() => {
                                ExamService.DeleteQuestion(
                                  exam.quizId,
                                  item.questionNo
                                );
                                setModal(false);
                                setUpdated(true);
                                exam.setErrorContent(
                                  "سوال" + item.questionNo + "حذف شد"
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
        name="افزودن سوال"
        modal={modal}
        toggle={() => {
          setModal(!modal);
        }}
        modalContent={modalContent}
      />
    </>
  );
};
