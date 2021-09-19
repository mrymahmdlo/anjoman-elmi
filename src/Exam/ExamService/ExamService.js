import { sendFormData, sendRequest } from "src/Service/APIExamEngine";

const Routes = {
  CreateQuizInfo: "AdminPanel/CreateQuizInfo",
  UploadQuestionFile: "AdminPanel/UploadQuestionFile/",
  UploadAnswerFile: "AdminPanel/UploadAnswerFile/",
  GetQuizDetails: "AdminPanel/GetQuizDetails/",
  GetDropDowns: "AdminPanel/GetDropDowns",
  CreateQuizDetails: "AdminPanel/CreateQuizDetails",
  DeleteQuizInfoDetails: "AdminPanel/DeleteQuizInfoDetail/",
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
      QuizMode: +form.QuizMode,
    }),
  UploadQuestionFile: async (quizId, data) =>
    await sendFormData(Routes.UploadQuestionFile + quizId, data),
  UploadAnswerFile: async (quizId, data) =>
    await sendFormData(Routes.UploadAnswerFile + quizId, data),
  GetQuizDetails: async (quizId) =>
    await sendRequest(Routes.GetQuizDetails + quizId),
  GetDropDowns: async () => await sendRequest(Routes.GetDropDowns),
  CreateQuizDetails: (form) =>
    sendRequest(Routes.CreateQuizDetails, {
      ...form,
      QuizId: +form.QuizId,
      RowId: +form.RowId,
      CourseId: +form.CourseId,
      StartPos: +form.StartPos,
      QuestionCount: +form.QuestionCount,
      TotalMinutes: +form.TotalMinutes,
    }),
  DeleteQuizInfoDetails: async (quizId, rowId) =>
    await sendRequest(
      Routes.DeleteQuizInfoDetails + quizId + "/" + rowId + "/0",{}
    ),
};

export default ExamService;
