import { combineReducers, createStore } from "redux";
import { reducer } from "./Reducer";

//  combining the reducers but in the app we hve only one reducer //

const rootReducer = combineReducers({
  reducer,
});

// this is the final store which wil be used by our app //
const store = createStore(rootReducer);

export default store;
