//  this containes all the action types and necessary actions required when needed in order to dispatch them //

export const TYPE = {
  ADDQUIZ: "ADDQUIZ",
  TOGGLEACTIVE: "TOGGLEACTIVE",
  DELETEQUIZ: "DELETEQUIZ",
  GETNAME: "GETNAME",
  PLAYQUIZ: "PLAYQUIZ",
  GETANSWER: "GETANSWER",
  RESET: "RESET",
};

export const addQuiz = (data) => {
  return {
    type: TYPE.ADDQUIZ,
    payload: data,
  };
};

export const toggleActive = (id) => {
  return {
    type: TYPE.TOGGLEACTIVE,
    payload: id,
  };
};

export const deleteQuiz = (id) => {
  return {
    type: TYPE.DELETEQUIZ,
    payload: id,
  };
};

export const getName = (name) => {
  return {
    type: TYPE.GETNAME,
    payload: name,
  };
};

export const playQuiz = (id) => {
  return {
    type: TYPE.PLAYQUIZ,
    payload: id,
  };
};

export const getAnswer = (ans) => {
  return {
    type: TYPE.GETANSWER,
    payload: ans,
  };
};
export const resetQuiz = () => {
  return {
    type: TYPE.RESET,
  };
};
