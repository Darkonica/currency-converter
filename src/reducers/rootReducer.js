import { combineReducers } from "redux";
import todos from "./todoReducer";
import visibilityFilter from "./filterReducer";

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
});

export default rootReducer;
