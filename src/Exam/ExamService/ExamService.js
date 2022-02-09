import { APICExamFormData, APIExamSendRequest } from "src/Service/APIExam";
import { HejriToDotNetGeorgian } from "src/Utility/DateTime";

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
  SwapQuizDetail: "AdminPanel/SwapQuizDetail",
  GetQuizFilesNames: "AdminPanel/GetQuizFilesNames/",
  FinalCheck: "AdminPanel/FinalCheck/",
  GetQuizInfo: "AdminPanel/GetQuizInfo/",
  UpdateQuizInfo: "AdminPanel/UpdateQuizInfo/",
  SwapQuestions: "AdminPanel/SwapQuestions",
  DeleteQuiz: "AdminPanel/DeleteQuizInfo/",
  UploadExcel: "api/Excel/ReadFile/",
  UploadAnswerVideo: "AdminPanel/UploadAnswerVideoFile/",
};

const TableRoutes = {
  GetAllQuiz: "AdminPanel/GetAllQuiz",
};

const ExamService = {
  GetAllQuiz: async (filters) =>
    await APIExamSendRequest(TableRoutes.GetAllQuiz, filters),
  DeleteQuiz: (quizId) => APIExamSendRequest(Routes.DeleteQuiz + quizId, {}),
  UploadAnswerVideo: async (quizId, form) =>
    APIExamSendRequest(Routes.UploadAnswerVideo + quizId, form),
  CreateQuizInfo: (form) =>
    APIExamSendRequest(Routes.CreateQuizInfo, {
      ...form,
      endDate: HejriToDotNetGeorgian(form.endDate),
      resultDate: HejriToDotNetGeorgian(form.resultDate),
      startDate: HejriToDotNetGeorgian(form.startDate),
      userId: +form.userId,
      studentCount: +form.studentCount,
      questionCount: +form.questionCount,
      price: +form.price,
      totalTimeMinutes: +form.totalTimeMinutes,
      quizMode: +form.quizMode,
      quizType: +form.quizType,
    }),
  UpdateQuizInfo: (quizId, form) => {
    return APIExamSendRequest(Routes.UpdateQuizInfo + quizId, {
      ...form,
      endDate: HejriToDotNetGeorgian(form.endDate),
      resultDate: HejriToDotNetGeorgian(form.resultDate),
      startDate: HejriToDotNetGeorgian(form.startDate),
      userId: +form.userId,
      studentCount: +form.studentCount,
      questionCount: +form.questionCount,
      price: +form.price,
      totalTimeMinutes: +form.totalTimeMinutes,
      quizMode: +form.quizMode,
      quizType: +form.quizType,
    });
  },
  UploadQuestionFile: async (quizId, data) =>
    await APICExamFormData(Routes.UploadQuestionFile + quizId, data),
  UploadAnswerFile: async (quizId, data) =>
    await APICExamFormData(Routes.UploadAnswerFile + quizId, data),
  GetQuizDetails: async (quizId) =>
    await APIExamSendRequest(Routes.GetQuizDetails + quizId),
  GetDropDowns: async () => await APIExamSendRequest(Routes.GetDropDowns),
  CreateQuizDetails: (form) =>
    APIExamSendRequest(Routes.CreateQuizDetails, {
      ...form,
      quizId: +form.quizId,
      rowId: +form.rowId,
      courseId: +form.courseId,
      startPos: +form.startPos,
      questionCount: +form.questionCount,
      totalMinutes: +form.totalMinutes,
    }),
  UploadExcel: async (quizId, file) =>
    await APICExamFormData(Routes.UploadExcel + quizId, file),
  DeleteQuizInfoDetails: async (quizId, rowId) =>
    await APIExamSendRequest(
      Routes.DeleteQuizInfoDetails + quizId + "/" + rowId + "/0",
      {}
    ),
  UpdateQuizInfoDetail: async (rowId, form) =>
    await APIExamSendRequest(Routes.UpdateQuizInfoDetail + rowId, {
      ...form,
      quizId: +form.quizId,
      rowId: +form.rowId,
      courseId: +form.courseId,
      startPos: +form.startPos,
      questionCount: +form.questionCount,
      totalMinutes: +form.totalMinutes,
    }),
  CreateQuestions: async (form) =>
    await APIExamSendRequest(Routes.CreateQuestions, {
      ...form,
      quizId: +form.quizId,
      questionNo: +form.questionNo,
      correctAnswerNo: +form.correctAnswerNo,
      correctAnswerString: form[`choice${+form.correctAnswerNo}`],
      answerCount: +form.answerCount,
      questionLevel: +form.questionLevel,
    }),
  GetQuestions: (quizId) => APIExamSendRequest(Routes.GetQuestions + quizId),
  DeleteQuestion: async (quizId, numQ) =>
    await APIExamSendRequest(Routes.DeleteQuestion + quizId + "/" + numQ, {}),
  UpdateQuestion: async (numQ, form) =>
    await APIExamSendRequest(Routes.UpdateQuestion + numQ, {
      ...form,
      quizId: +form.quizId,
      questionNo: +form.questionNo,
      correctAnswerNo: +form.correctAnswerNo,
      correctAnswerString: form[`choice${+form.correctAnswerNo}`],
      answerCount: +form.answerCount,
      questionLevel: +form.questionLevel,
    }),
  SwapQuizDetail: async (form) =>
    await APIExamSendRequest(Routes.SwapQuizDetail, {
      quizId: +form.quizId,
      firstId: +form.firstId,
      secondId: +form.secondId,
    }),
  GetQuizFilesNames: async (quizId) =>
    await APIExamSendRequest(Routes.GetQuizFilesNames + quizId),
  GetQuizInfo: async (quizId) =>
    await APIExamSendRequest(Routes.GetQuizInfo + quizId),
  FinalCheck: async (quizId) =>
    await APIExamSendRequest(Routes.FinalCheck + quizId),
  SwapQuestions: async (form) =>
    await APIExamSendRequest(Routes.SwapQuestions, {
      quizId: +form.quizId,
      firstId: +form.firstId,
      secondId: +form.secondId,
    }),
};

export default ExamService;
