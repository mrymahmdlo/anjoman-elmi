const InitialForm = (quizId, rowId) => ({
  QuizId: quizId,
  RowId: `${rowId}`,
  CourseId: "1",
});

const QuizDetailsValidators = {
  QuizId: {
    mustFill: true,
    type: "Number",
  },
  RowId: {
    mustFill: false,
    type: "Number",
  },
  CourseName: {
    mustFill: true,
    type: "String",
  },
  CourseId: {
    mustFill: true,
    type: "Array",
  },
  StartPos: {
    mustFill: true,
    type: "Number",
  },
  TotalMinutes: {
    mustFill: true,
    type: "Number",
  },
};

export { InitialForm, QuizDetailsValidators };
