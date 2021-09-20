const InitialForm = (quizId, questionNo) => ({
  quizId,
  questionNo: `${questionNo}`,
  answerCount: 4,
  correctAnswerString: "",
  designerName: null,
  questionLevel: "0",
  correctAnswerNo: "1",
});

const levels = [
  { name: "ساده", id: "0" },
  { name: "متوسط", id: "1" },
  { name: "دشوار", id: "2" },
  { name: "دشوار تر", id: "3" },
];

const QuestionFormValidators = {
  quizId: {
    mustFill: true,
    type: "Number",
  },
  questionNo: {
    mustFill: true,
    type: "Number",
  },
  designerName: {
    mustFill: false,
    type: "String",
  },
  questionText: {
    mustFill: true,
    type: "String",
  },
  choice1: {
    mustFill: true,
    type: "String",
  },
  choice2: {
    mustFill: true,
    type: "String",
  },
  choice3: {
    mustFill: true,
    type: "String",
  },
  choice4: {
    mustFill: true,
    type: "String",
  },
  correctAnswerNo: {
    mustFill: true,
    type: "Number",
  },
  correctAnswerString: {
    mustFill: false,
    type: "String",
  },
  answerCount: {
    mustFill: false,
    type: "Number",
  },
  questionLevel: {
    mustFill: true,
    type: "Number",
  },
};

export { InitialForm, QuestionFormValidators,levels };
