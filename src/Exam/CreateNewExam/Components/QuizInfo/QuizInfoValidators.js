const InitialForm = (userId) => ({
  UserId: +userId,
  IsLock: false,
  IsValid: false,
  GroupCodes: [],
  StartDate: null,
  ResultDate: null,
  EndDate: null,
  ShowResultImmediately: true,
  QuestionFileReady: false,
  AnswerFileReady: false,
  QuizMode: "2",
});

const QuizInfoValidators = {
  QuizTitle: {
    mustFill: true,
    type: "String",
  },
  QuizDescription: {
    mustFill: false,
    type: "String",
  },
  UserId: {
    mustFill: true,
    type: "Number",
  },
  GroupCodes: {
    mustFill: true,
    type: "Array",
  },
  StudentCount: {
    mustFill: true,
    type: "Number",
  },
  QuestionCount: {
    mustFill: true,
    type: "Number",
  },
  Price: {
    mustFill: true,
    type: "Number",
  },
  StartDate: {
    mustFill: true,
    type: "String",
  },
  EndDate: {
    mustFill: true,
    type: "String",
  },
  ResultDate: {
    mustFill: true,
    type: "String",
  },
  ShowResultImmediately: {
    mustFill: true,
    type: "Boolean",
  },
  TotalTimeMinutes: {
    mustFill: true,
    type: "Number",
  },
  IsValid: {
    mustFill: true,
    type: "Boolean",
  },
  IsLock: {
    mustFill: true,
    type: "Boolean",
  },
  QuestionFileReady: {
    mustFill: true,
    type: "Boolean",
  },
  AnswerFileReady: {
    mustFill: true,
    type: "Boolean",
  },
};

export { InitialForm, QuizInfoValidators };
