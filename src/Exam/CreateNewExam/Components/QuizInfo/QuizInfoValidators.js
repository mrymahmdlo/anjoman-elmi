const InitialForm = (userId) => ({
  userId: +userId,
  isLock: true,
  isValid: false,
  groupCodes: [],
  startDate: null,
  resultDate: null,
  endDate: null,
  showResultImmediately: true,
  questionFileReady: false,
  answerFileReady: false,
  quizMode: "2",
  quiztype:'1'
});

const QuizInfoValidators = {
  quizTitle: {
    mustFill: true,
    type: "String",
  },
  quizDescription: {
    mustFill: false,
    type: "String",
  },
  userId: {
    mustFill: true,
    type: "Number",
  },
  groupCodes: {
    mustFill: true,
    type: "Array",
  },
  studentCount: {
    mustFill: true,
    type: "Number",
  },
  questionCount: {
    mustFill: true,
    type: "Number",
  },
  price: {
    mustFill: true,
    type: "Number",
  },
  startDate: {
    mustFill: true,
    type: "String",
  },
  endDate: {
    mustFill: true,
    type: "String",
  },
  resultDate: {
    mustFill: true,
    type: "String",
  },
  showResultImmediately: {
    mustFill: true,
    type: "Boolean",
  },
  totalTimeMinutes: {
    mustFill: true,
    type: "Number",
  },
  isValid: {
    mustFill: false,
    type: "Boolean",
  },
  isLock: {
    mustFill: true,
    type: "Boolean",
  },
  questionFileReady: {
    mustFill: true,
    type: "Boolean",
  },
  answerFileReady: {
    mustFill: true,
    type: "Boolean",
  },
};

export { InitialForm, QuizInfoValidators };
