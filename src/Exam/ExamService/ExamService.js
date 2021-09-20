import { sendFormData, sendRequest } from "src/Service/APIExamEngine";

const Routes = {
  CreateQuizInfo: "AdminPanel/CreateQuizInfo",
  UploadQuestionFile: "AdminPanel/UploadQuestionFile/",
  UploadAnswerFile: "AdminPanel/UploadAnswerFile/",
  GetQuizDetails: "AdminPanel/GetQuizDetails/",
  GetDropDowns: "AdminPanel/GetDropDowns",
  CreateQuizDetails: "AdminPanel/CreateQuizDetails",
  DeleteQuizInfoDetails: "AdminPanel/DeleteQuizInfoDetail/",
  UpdateQuizInfoDetail: "AdminPanel/UpdateQuizInfoDetail/",
  CreateQuestions: "AdminPanel/CreateQuestions",
  GetQuestions: "AdminPanel/GetQuestions/",
  DeleteQuestion: "AdminPanel/DeleteQuestion/",
  UpdateQuestion: "AdminPanel/UpdateQuestion/",
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
      quizId: +form.quizId,
      rowId: +form.rowId,
      courseId: +form.courseId,
      startPos: +form.startPos,
      questionCount: +form.questionCount,
      totalMinutes: +form.totalMinutes,
    }),
  DeleteQuizInfoDetails: async (quizId, rowId) =>
    await sendRequest(
      Routes.DeleteQuizInfoDetails + quizId + "/" + rowId + "/0",
      {}
    ),
  UpdateQuizInfoDetail: async (rowId, form) =>
    await sendRequest(Routes.UpdateQuizInfoDetail + rowId, {
      ...form,
      quizId: +form.quizId,
      rowId: +form.rowId,
      courseId: +form.courseId,
      startPos: +form.startPos,
      questionCount: +form.questionCount,
      totalMinutes: +form.totalMinutes,
    }),
  CreateQuestions: async (form) =>
    await sendRequest(Routes.CreateQuestions, {
      ...form,
      quizId: +form.quizId,
      questionNo: +form.questionNo,
      correctAnswerNo: +form.correctAnswerNo,
      correctAnswerString: form[`choice${+form.correctAnswerNo}`],
      answerCount: +form.answerCount,
      questionLevel: +form.questionLevel,
    }),
  GetQuestions: (quizId) => sendRequest(Routes.GetQuestions + quizId),
  DeleteQuestion: async (quizId, numQ) =>
    await sendRequest(Routes.DeleteQuestion + quizId + "/" + numQ, {}),
  UpdateQuestion: async (numQ, form) =>
    await sendRequest(Routes.UpdateQuestion + numQ, {
      ...form,
      quizId: +form.quizId,
      questionNo: +form.questionNo,
      correctAnswerNo: +form.correctAnswerNo,
      correctAnswerString: form[`choice${+form.correctAnswerNo}`],
      answerCount: +form.answerCount,
      questionLevel: +form.questionLevel,
    }),
};

export default ExamService;
