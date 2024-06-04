import React, { useState } from "react";
import { CreateNewForm } from "./CreateNewForm";
import { motion } from "framer-motion";

// this is the starting of our creating quiz app which returns a model//

const CreateNewModel = ({ handelModel }) => {
  return (
    <div className="create-Model d-flex">
      <motion.div
        className="mcq-container d-flex"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <button className="mcq-button" onClick={handelModel}>
          MCQ (Single Correct)
        </button>
      </motion.div>
    </div>
  );
};

export const CreateNew = () => {
  const [ShowModel, setShowModel] = useState(true);

  const handelModel = () => {
    setShowModel(false);
  };

  return (
    <div>
      {ShowModel ? (
        <CreateNewModel handelModel={handelModel} />
      ) : (
        <CreateNewForm />
      )}
    </div>
  );
};
