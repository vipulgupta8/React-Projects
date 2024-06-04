import React from "react";

// this component will display our answers to the user which has a handler function which will select the answer we need and lift the state up //

const AnswerCard = ({ id, answer, correct, getAnswerHandler, selectedId }) => {
  const onclickHandler = () => {
    getAnswerHandler(answer, correct, id);
  };

  return (
    <div
      className="quiz-option-container"
      onClick={onclickHandler}
      style={{ background: `${selectedId === id ? "green" : " "}` }}
    >
      <span
        className="answer-circle"
        style={{ background: `${selectedId === id ? "blue" : " "}` }}
      ></span>
      <p>{answer}</p>
    </div>
  );
};

// this is all the logic of playing and selecting the answers of the quiz it has got all the props and states we need//

export const QuizCard = ({
  count,
  nextQuestionHandler,
  question,
  answers,
  getAnswerHandler,
  length,
  selectedId,
}) => {
  return (
    <div className="play-quiz-questions">
      <div className="quiz-question" style={{ fontWeight: "600" }}>
        <div style={{ fontSize: "14px" }}>Please select only One Answer!</div>
        {count + 1}. {question}
      </div>

      <div className="quiz-options">
        {answers.map((el, i) => (
          <AnswerCard
            key={el.id}
            id={el.id}
            correct={el.correct}
            answer={el.answer}
            getAnswerHandler={getAnswerHandler}
            selectedId={selectedId}
          />
        ))}
      </div>
      <div className="quiz-next-btn">
        <div className="quiz-question-no">
          Question {count + 1}/{length}
        </div>
        <div className="next-question">
          <button onClick={nextQuestionHandler}>Next Question</button>
        </div>
      </div>
    </div>
  );
};
