const PreviewQuestion = (item) =>
  `<div dir="rtl">
    <p> سوال ${item.questionNo} ${item.questionText}</p>
    <br/>
    <p style="${item.correctAnswerNo === 1 ? "color:green" : ""}"> ${
    item.correctAnswerNo === 1 ? "&#10003 " : ""
  }گزینه یک )${item.choice1}</p>
  <p style="${item.correctAnswerNo === 2 ? "color:green" : ""}"> ${
    item.correctAnswerNo === 2 ? "&#10003 " : ""
  } گزینه دو )${item.choice2}</p>
  <p style="${item.correctAnswerNo === 3 ? "color:green" : ""}"> ${
    item.correctAnswerNo === 3 ? "&#10003 " : ""
  }گزینه سه )${item.choice3}</p>
  <p style="${item.correctAnswerNo === 4 ? "color:green" : ""}">${
    item.correctAnswerNo === 4 ? "&#10003 " : ""
  }گزینه چهار )${item.choice4}</p>
  </div>`;
export default PreviewQuestion;
