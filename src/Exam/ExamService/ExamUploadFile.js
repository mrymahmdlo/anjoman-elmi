import ExamService from "./ExamService";
const status = {
  LOADING: 0,
  UPLOADED: 1,
  FAILED: -1,
  EMPTY: 2,
};
const UploadAnswerFile = async (file, type, quizId, setStatusAnswerFile) => {
  setStatusAnswerFile(status.LOADING);
  let form = UploadFile(file, type, "answerFile");
  if (form === "failed") return false;
  await ExamService.UploadAnswerFile(quizId, form)
    .then(() => setStatusAnswerFile(status.UPLOADED))
    .catch(() => setStatusAnswerFile(status.FAILED));
};

const UploadQuestionFile = async (
  file,
  type,
  quizId,
  setStatusQuestionFile
) => {
  setStatusQuestionFile(status.LOADING);
  let form = UploadFile(file, type, "questionFile");
  if (form === "failed") return false;
  await ExamService.UploadQuestionFile(quizId, form)
    .then(() => setStatusQuestionFile(status.UPLOADED))
    .catch(() => setStatusQuestionFile(status.FAILED));
};

const UploadFile = (file, type, name) => {
  if (!file) return;
  if (getExtension(file.name, type)) return "failed";
  const form = new FormData();
  form.append(name, file, file.name);
  return form;
};

const getExtension = (filename, type) => {
  var parts = filename.split(".");
  return parts[1] !== type;
};

export { UploadQuestionFile, UploadAnswerFile };
