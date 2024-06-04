import { TYPE } from "./Actions";

//  this is our initital state of the app //
const initialState = {
  quiz: [],
  name: "",
  playQuiz: [],
  answers: [],
};

// the reducer containes all the necessary functions in order to update our state accordingly //

export const reducer = (state = initialState, actions) => {
  if (actions.type === TYPE.ADDQUIZ) {
    return { ...state, quiz: [...state.quiz, actions.payload] };
  }

  if (actions.type === TYPE.TOGGLEACTIVE) {
    const findElem = state.quiz.find((el) => el.id === actions.payload);

    const filteredArr = state.quiz.filter((el) => el.id !== actions.payload);

    const newArr = [
      { ...findElem, isActive: !findElem.isActive },
      ...filteredArr,
    ];

    return {
      ...state,
      quiz: newArr,
    };
  }

  if (actions.type === TYPE.DELETEQUIZ) {
    const filteredArr = state.quiz.filter((el) => el.id !== actions.payload);

    return {
      ...state,
      quiz: filteredArr,
    };
  }

  if (actions.type === TYPE.GETNAME) {
    return {
      ...state,
      name: actions.payload,
    };
  }

  if (actions.type === TYPE.PLAYQUIZ) {
    const findElem = state.quiz.find((el) => el.id === actions.payload);

    return {
      ...state,
      playQuiz: findElem,
    };
  }

  if (actions.type === TYPE.GETANSWER) {
    console.log(actions.payload);
    return {
      ...state,
      answers: [...state.answers, actions.payload],
    };
  }

  if (actions.type === TYPE.RESET) {
    return {
      ...state,
      name: "",
      playQuiz: [],
      answers: [],
    };
  }

  return state;
};
