import React, { useEffect, useState } from "react";
import { CCard, CContainer } from "@coreui/react";
import { Toast } from "src/Utility/Toast";
import { TokenManager } from "src/Identity/Service/TokenManager";
import QuizInfoForm from "./Forms/QuizInfoForm";
import QuizDetailsForm from "./Forms/QuizDetailsForm";
import { ExamBreadcrumb } from "./Components/ExamBreadcrumb";
import CreateQuestionsForm from "./Forms/CreateQuestionsForm";
import EditQuizInfoForm from "./Forms/EditQuizInfoForm";

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
  useEffect(() => {
    if (quizId) {
      setStage(stages.EDITQUIZINFO);
    }
  }, [quizId]);
  useEffect(() => {
    if (showError) setTimeout(() => setShowError(false), 3200);
  }, [showError]);
  const StageSwitch = () => {
    switch (stage) {
      case stages.QUIZINFO:
        return <QuizInfoForm userId={userId} setQuizId={setQuizId} />;
      case stages.QUIZDETAILS:
        return <QuizDetailsForm setStage={setStage} />;
      case stages.QUIZQUESTIONS:
        return <CreateQuestionsForm setStage={setStage} />;
      case stages.EDITQUIZINFO:
        return <EditQuizInfoForm />;
      default:
        return "";
    }
  };
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
          }}
        >
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
