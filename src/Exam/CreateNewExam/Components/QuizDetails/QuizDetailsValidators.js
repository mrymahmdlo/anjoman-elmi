const InitialForm = (quizId, rowId) => ({
  quizId: quizId,
  rowId: `${rowId}`,
  courseId: "1",
});

const QuizDetailsValidators = {
  quizId: {
    mustFill: true,
    type: "Number",
  },
  rowId: {
    mustFill: true,
    type: "Number",
  },
  courseName: {
    mustFill: true,
    type: "String",
  },
  courseId: {
    mustFill: true,
    type: "Array",
  },
  startPos: {
    mustFill: true,
    type: "Number",
  },
  totalMinutes: {
    mustFill: true,
    type: "Number",
  },
};

export { InitialForm, QuizDetailsValidators };
