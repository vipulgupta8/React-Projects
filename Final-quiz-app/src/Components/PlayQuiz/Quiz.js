import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswer, resetQuiz } from "../Redux/Actions";
import { QuizCard } from "./QuizCard";
import { motion } from "framer-motion";
import img from "../../images/congo.png";
import { useNavigate } from "react-router-dom";

// this is th logic of the final results model to be shown after the end of the quiz //

export const ResultModel = ({ name }) => {
  const results = useSelector((state) => state.reducer.answers);
  const mapped = results.map((el) => el.isCorrect);

  const navigate = useNavigate();
  const disptach = useDispatch();

  //  this handler will reset our state and route us to the homepage by dispatching the reset action//
  const resetQuizHandler = () => {
    disptach(resetQuiz());

    navigate("/");
  };

  return (
    <div className="result-container d-flex">
      <motion.div
        className="result-main"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="congo-img">
          <img src={img} alt="" width={"350px"} />
          <p>Hii ! {name}</p>
          <p>
            Your Score is {mapped.filter((el) => el === true).length} out of{" "}
            {mapped.length}
          </p>
        </div>
        <div className="end-game-btn d-flex">
          <button onClick={() => resetQuizHandler()}>Okay</button>
        </div>
      </motion.div>
    </div>
  );
};

// this is all the logic of our final reults page //

export const Quiz = () => {
  const [count, setcount] = useState(0);
  const [showModal, setshowModal] = useState(false);
  const [finalAnswer, setfinalAnswer] = useState({});

  const quiz = useSelector((state) => state.reducer.playQuiz).questions;
  const name = useSelector((state) => state.reducer.name);

  const dispatch = useDispatch();

  // this handler dipacthes our selected answers and increments the count taking us to the next questions //

  const nextQuestionHandler = () => {
    dispatch(getAnswer(finalAnswer));

    if (count >= quiz.length - 1) {
      setshowModal(true);
      setcount((prev) => prev);
    } else {
      setcount((prev) => prev + 1);
    }
  };

  //  this handler will change our selected answers if we select again and again and set them in the state //

  const getAnswerHandler = (answer, correct, id) => {
    const Answer = {
      answer: answer,
      isCorrect: correct,
      id: id,
    };
    setfinalAnswer(Answer);
  };

  // these our the states and data which is to be shown and played //

  const question = quiz[count].question;
  const answers = quiz[count].answers;

  return (
    <div className="quiz-container d-flex">
      <div className="play-quiz-container-name">
        <div className="play-heading">
          <p>Hii! {name}</p>
        </div>

        <QuizCard
          nextQuestionHandler={nextQuestionHandler}
          count={count}
          question={question}
          answers={answers}
          getAnswerHandler={getAnswerHandler}
          length={quiz.length}
          selectedId={finalAnswer.id ? finalAnswer.id : ""}
        />
      </div>
      {showModal && <ResultModel name={name} />}
    </div>
  );
};
