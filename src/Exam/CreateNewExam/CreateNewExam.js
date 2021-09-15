import React, { useEffect, useState } from "react";
import { CCard, CCardHeader, CContainer } from "@coreui/react";
import { Toast } from "src/Utility/Toast";
import { TokenManager } from "src/Identity/Service/TokenManager";
import QuizInfoForm from "./Forms/QuizInfoForm";
import QuizDetailsForm from "./Forms/QuizDetailsForm";
import { HeaderTextLoader } from "./Components/HeaderTextLoader";

const stages = {
  QUIZINFO: 0,
  QUIZDETAILS: 1,
};

const CreateExam = () => {
  const { GetUserId } = TokenManager();
  const userId = +GetUserId();
  const [showError, setShowError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [stage, setStage] = useState(stages.QUIZINFO);
  const [quizId, setQuizId] = useState(88);
  useEffect(() => {
    if (quizId) {
      setStage(stages.QUIZDETAILS);
    }
  }, [quizId]);
  useEffect(() => {
    if (showError) setTimeout(() => setShowError(false), 3200);
  }, [showError]);
  return (
    <div className="App">
      <CContainer fluid>
        <CCard>
          <CCardHeader>
            ایجاد آزمون جدید /<small> {HeaderTextLoader(stage, stages)}</small>
          </CCardHeader>
          {stage === stages.QUIZINFO ? (
            <QuizInfoForm
              showError={showError}
              setShowError={setShowError}
              setErrorContent={setErrorContent}
              userId={userId}
              setQuizId={setQuizId}
            />
          ) : (
            <QuizDetailsForm
              setShowError={setShowError}
              setErrorContent={setErrorContent}
              quizId={quizId}
            />
          )}
        </CCard>
      </CContainer>
      <Toast showError={showError} errorContent={errorContent} />
    </div>
  );
};

export default CreateExam;
