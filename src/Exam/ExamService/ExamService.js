import { sendRequest } from "src/Service/APIExamEngine";

const Routes = {
  CreateQuizInfo: "AdminPanel/CreateQuizInfo",
};

const ExamService = {
  CreateQuizInfo: (form) =>
    sendRequest(Routes.CreateQuizInfo, {
      ...form,
      UserId: +form.UserId,
      StudentCount: +form.StudentCount,
      QuestionCount: +form.QuestionCount,
      Price: +form.Price,
      TotalTimeMinutes: +form.TotalTimeMinutes,
    }),
};

export default ExamService;
