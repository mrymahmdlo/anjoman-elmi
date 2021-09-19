import React, { useEffect, useState } from "react";
import { CCard, CContainer } from "@coreui/react";
import { Toast } from "src/Utility/Toast";
import { TokenManager } from "src/Identity/Service/TokenManager";
import QuizInfoForm from "./Forms/QuizInfoForm";
import QuizDetailsForm from "./Forms/QuizDetailsForm";
import { ExamBreadcrumb } from "./Components/ExamBreadcrumb";
import CreateQuestionsForm from "./Forms/CreateQuestionsForm";

const stages = {
  QUIZINFO: 0,
  QUIZDETAILS: 1,
  QUIZQUESTIONS: 2,
};

export const ExamContext = React.createContext();

const CreateExam = () => {
  const { GetUserId } = TokenManager();
  const userId = +GetUserId();
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [stage, setStage] = useState(stages.QUIZINFO);
  const [quizId, setQuizId] = useState(91);
  useEffect(() => {
    if (quizId) {
      setStage(stages.QUIZDETAILS);
    }
  }, [quizId]);
  useEffect(() => {
    if (showError) setTimeout(() => setShowError(false), 3200);
  }, [showError]);
  const StageSwitch = () => {
    switch (stage) {
      case stages.QUIZINFO:
        return (
          <QuizInfoForm
            showError={showError}
            setShowError={setShowError}
            setErrorContent={setErrorContent}
            userId={userId}
            setQuizId={setQuizId}
          />
        );
      case stages.QUIZDETAILS:
        return (
          <QuizDetailsForm
            setShowError={setShowError}
            setErrorContent={setErrorContent}
            quizId={quizId}
          />
        );
      case stages.QUIZQUESTIONS:
        return <CreateQuestionsForm quizId={quizId} />;
      default:
        return "";
    }
  };
  return (
    <div className="App">
      <CContainer fluid>
        <ExamContext.Provider value={{ quizId, setShowError, setErrorContent }}>
          <CCard>
            {ExamBreadcrumb(stage, stages)}
            {StageSwitch()}
          </CCard>
        </ExamContext.Provider>
      </CContainer>
      <Toast showError={showError} errorContent={errorContent} />
    </div>
  );
};

export default CreateExam;
