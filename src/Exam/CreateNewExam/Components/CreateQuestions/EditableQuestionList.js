import CIcon from "@coreui/icons-react";
import {
  CButton,
  CListGroup,
  CListGroupItem,
  CPagination,
  CSpinner,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExamService from "../../../ExamService/ExamService";
import { ExamContext } from "../../CreateNewExam";
import { ExamModalContainer } from "../ExamModalContainer";
import AddQuestionForm from "./AddQuestionForm";
import EditQuestionForm from "./EditQuestionForm";
import PreviewQuestion from "./PreviewQuestion";
import SwitchQuestions from "./SwitchQuestions";

const countPG = 20;

export const EditableQuestionList = () => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [updated, setUpdated] = useState(false);
  const [data, setData] = useState();
  const [currentPage, setActivePage] = useState(1);
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
            <dt className="col-sm-8">سوالات آزمون ({data?.length})</dt>
            <dd style={{ textOverflow: "ellipsis", marginRight: "25px" }}>
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
              <Link to={`/Exams/QuestionBank/${exam.quizId}`}>
                {" "}
                <CButton color="info" className="mr-3">
                  انتخاب سوال از بانک سوالات
                </CButton>
              </Link>
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
          data
            .slice(
              (currentPage - 1) * countPG,
              (currentPage - 1) * countPG + countPG
            )
            .map((item, i) => (
              <CListGroupItem
                key={i}
                style={{ paddingTop: 0, paddingBottom: 0 }}
              >
                <div className="d-flex align-items-center">
                  <dt className="col-sm-1">{item.questionNo + " - "}</dt>
                  <dd
                    className="col-sm-8"
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
                  <dd className="col-sm-3 mr-3">
                    <CButton
                      color="primary"
                      className="m-1"
                      onClick={() => {
                        setModalContent(
                          <EditQuestionForm
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
                          <SwitchQuestions
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
                      className="m-1"
                      color="dark"
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
      <CPagination
        activePage={currentPage}
        pages={data ? Math.ceil(data.length / countPG) : 1}
        arrows={false}
        onActivePageChange={(i) => setActivePage(i)}
      ></CPagination>
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
