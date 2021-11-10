const { sendRequest } = require("src/Service/APIExamEngine");

const routes = {
  importQuestion: "AdminPanel/ImportQuestion",
  getQuestion: "AdminPanel/GetQuestionsBank",
};

const ImportQuestion = {
  AddQuestion: async (body) =>
    await sendRequest(routes.importQuestion, body),
  GetQuestion: async (filters) =>
    await sendRequest(routes.getQuestion, filters),
};

export default ImportQuestion;
