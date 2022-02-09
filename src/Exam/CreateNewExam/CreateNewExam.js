import React, { useEffect, useState } from "react";
import { CCard, CContainer } from "@coreui/react";
import { Toast } from "src/Utility/Toast";
import { TokenManager } from "../../Identity/Service/TokenManager";
import QuizInfoForm from "./Forms/QuizInfoForm";
import QuizDetailsForm from "./Forms/QuizDetailsForm";
import { ExamBreadcrumb } from "./Components/ExamBreadcrumb";
import CreateQuestionsForm from "./Forms/CreateQuestionsForm";
import EditQuizInfoForm from "./Forms/EditQuizInfoForm";
import { Route, Router, useHistory } from "react-router";
import ExamCardFooter from "./Components/ExamCardFooter";

const stages = {
  QUIZINFO: 0,
  QUIZDETAILS: 1,
  QUIZQUESTIONS: 2,
  EDITQUIZINFO: 3,
};

export const ExamContext = React.createContext();

const CreateExam = () => {
  const { GetUserId } = TokenManager();
  const userId = +GetUserId();
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [stage, setStage] = useState(stages.QUIZINFO);
  const [quizId, setQuizId] = useState();
  const [quizMode, setQuizMode] = useState();
   const [quizType, setQuizType] = useState();

  const history = useHistory();
  useEffect(() => {
    if (quizId) {
      setStage(stages.EDITQUIZINFO);
      history.push("/Exams/CreateExam/EditQuizInfo");
    } else {
      history.push("/Exams/CreateExam/QuizInfo");
    }
  }, [quizId, history]);
  useEffect(() => {
    if (showError) setTimeout(() => setShowError(false), 3200);
  }, [showError]);
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
            quizType,
            setQuizType,
          }}
        >
          <CCard>
            {ExamBreadcrumb(stage, stages)}
            <Router history={history}>
              <Route path="/Exams/CreateExam/QuizInfo" exact>
                <QuizInfoForm userId={userId} setQuizId={setQuizId} />
              </Route>
              <Route
                path="/Exams/CreateExam/QuizDetails"
                exact
                component={QuizDetailsForm}
              >
                <QuizDetailsForm />
                <ExamCardFooter />
              </Route>
              <Route path="/Exams/CreateExam/Questions" exact>
                <CreateQuestionsForm />
                <ExamCardFooter />
              </Route>
              <Route path="/Exams/CreateExam/EditQuizInfo" exact>
                <EditQuizInfoForm />
                <ExamCardFooter />
              </Route>
            </Router>
          </CCard>
        </ExamContext.Provider>
      </CContainer>
      <Toast showError={showError} errorContent={errorContent} />
    </div>
  );
};

export default CreateExam;
