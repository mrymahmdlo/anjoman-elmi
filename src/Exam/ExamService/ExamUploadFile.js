import ExamService from "./ExamService";
const status = {
  LOADING: 0,
  UPLOADED: 1,
  FAILED: -1,
  EMPTY: 2,
};

const UploadAnswerVideo = async (url, quizId, setStatusvideoFile) => {
  setStatusvideoFile(status.LOADING);
  if (url === "") return setStatusvideoFile(status.FAILED);
  let form = {
    VideoLink: url,
  };
  await ExamService.UploadAnswerVideo(quizId, form)
    .then(() => setStatusvideoFile(status.UPLOADED))
    .catch(() => setStatusvideoFile(status.FAILED));
};

const UploadAnswerFile = async (file, type, quizId, setStatusAnswerFile) => {
  setStatusAnswerFile(status.LOADING);
  let form = UploadFile(file, type, "answerFile");
  if (form === "failed") return setStatusAnswerFile(status.FAILED);
  await ExamService.UploadAnswerFile(quizId, form)
    .then(() => setStatusAnswerFile(status.UPLOADED))
    .catch(() => setStatusAnswerFile(status.FAILED));
};

const UploadExcel = async (file, type, quizId, setStatusAnswerFile) => {
  setStatusAnswerFile(status.LOADING);
  let form = UploadFile(file, type, "file");
  if (form === "failed") return setStatusAnswerFile(status.FAILED);
  await ExamService.UploadExcel(quizId, form)
    .then(() => {
      setStatusAnswerFile(status.UPLOADED);
    })
    .catch(() => {
      setStatusAnswerFile(status.FAILED);
    });
};

const UploadQuestionFile = async (
  file,
  type,
  quizId,
  setStatusQuestionFile
) => {
  setStatusQuestionFile(status.LOADING);
  let form = UploadFile(file, type, "questionFile");
  if (form === "failed") return setStatusQuestionFile(status.FAILED);
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

export { UploadQuestionFile, UploadAnswerFile, UploadExcel, UploadAnswerVideo };
