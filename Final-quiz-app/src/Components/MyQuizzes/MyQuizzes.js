import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Quizzes } from "./Quizzes";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz } from "../Redux/Actions";
import { motion } from "framer-motion";

// this is the logic of the model to be displayed for deleting the entire quiz we hve made //

const DeleteModel = ({ closeModel, id }) => {
  const dispatch = useDispatch();

  const onDeleteHandler = (id) => {
    dispatch(deleteQuiz(id));
    closeModel();
  };

  return (
    <div className="delete-model-container d-flex">
      <motion.div
        className="delete-model-main"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="delete-heading">
          <h2>Are you sure you want to delete?</h2>
          <p>
            Deleting this will result in loosing the file permanently and is not
            recoverable
          </p>
          <div className="delete-model-actions">
            <button onClick={() => onDeleteHandler(id)}>Yes</button>
            <button onClick={() => closeModel()}>No</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// this is th logic of entire my quizzes page which will store all the quizes we  have made and from here we can activate and disactivate the quizzes which we can play ultimately //

export const MyQuizzes = () => {
  const [model, setmodel] = useState(false);
  const [deleteId, setdeleteId] = useState(0);
  const Quiz = useSelector((state) => state.reducer.quiz);

  const openModel = (id) => {
    setdeleteId(id);
    setmodel(true);
  };
  const closeModel = () => {
    setmodel(false);
  };

  return (
    <>
      {model && <DeleteModel closeModel={closeModel} id={deleteId} />}
      <motion.div
        className="my-quiz-container d-flex"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="quiz-main">
          <div className="quiz-header ">
            <div className="quiz-heading">
              <h1>My Quizes</h1>
            </div>
            <div className="create-new-btn">
              <NavLink to="/create-new">
                <button className="create-new-button">Create New Quiz</button>
              </NavLink>
            </div>
          </div>

          <div className="all-quiz-container">
            {Quiz.length === 0 ? (
              <p style={{ color: "red" }}>Currently there are no quizes!</p>
            ) : (
              Quiz.map((el, i) => (
                <Quizzes
                  key={el.id}
                  title={el.title}
                  id={el.id}
                  active={el.isActive}
                  date={el.createdOn}
                  serial={i + 1}
                  openModel={openModel}
                />
              ))
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};
