import React, { useEffect, useState } from "react";
import { CCard, CContainer, CSpinner } from "@coreui/react";
import { Toast } from "src/Utility/Toast";
import QuizDetailsForm from "../CreateNewExam/Forms/QuizDetailsForm";
import CreateQuestionsForm from "../CreateNewExam/Forms/CreateQuestionsForm";
import EditQuizInfoForm from "../CreateNewExam/Forms/EditQuizInfoForm";
import { Route, Router, useHistory, useParams } from "react-router";
import { ExamBreadcrumb } from "../CreateNewExam/Components/ExamBreadcrumb";
import { ExamContext } from "../CreateNewExam/CreateNewExam";
import EditExamCardFooter from "./EditExamCardFooter";

const stages = {
  QUIZDETAILS: 1,
  QUIZQUESTIONS: 2,
  EDITQUIZINFO: 3,
};

const EditExam = () => {
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [stage, setStage] = useState(stages.EDITQUIZINFO);
  const [quizId, setQuizId] = useState();
  const [quizMode, setQuizMode] = useState();
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    if (id) {
      setQuizId(id);
    }
  }, [id, history]);
  useEffect(() => {
    if (showError) setTimeout(() => setShowError(false), 3200);
  }, [showError]);
  if (!quizId)
    return (
      <CSpinner
        style={{ width: "5rem", height: "5rem" }}
        color="primary"
        variant="grow"
      />
    );
  return (
    <div className="App">
      <CContainer fluid>
        <ExamContext.Provider
          value={{
            quizId,
            setShowError,
            setErrorContent,
            stage,
            setStage,
            stages,
            quizMode,
            setQuizMode,
          }}
        >
          <CCard>
            {ExamBreadcrumb(stage, stages)}
            <Router history={history}>
              <Route path="/Exams/EditExam/QuizDetails/:id" exact>
                <QuizDetailsForm />
                <EditExamCardFooter />
              </Route>
              <Route path="/Exams/EditExam/Questions/:id" exact>
                <CreateQuestionsForm />
                <EditExamCardFooter />
              </Route>
              <Route path="/Exams/EditExam/EditQuizInfo/:id" exact>
                <EditQuizInfoForm />
                <EditExamCardFooter />
              </Route>
            </Router>
          </CCard>
        </ExamContext.Provider>
      </CContainer>
      <Toast showError={showError} errorContent={errorContent} />
    </div>
  );
};

export default EditExam;
