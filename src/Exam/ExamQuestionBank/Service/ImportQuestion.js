import { APIExamSendRequest } from "src/Service/APIExam";

const routes = {
  importQuestion: "AdminPanel/ImportQuestion",
  getQuestion: "AdminPanel/GetQuestionsBank",
};

const ImportQuestion = {
  AddQuestion: async (body) =>
    await APIExamSendRequest(routes.importQuestion, body),
  GetQuestion: async (filters) =>
    await APIExamSendRequest(routes.getQuestion, filters),
};

export default ImportQuestion;
