import { combineReducers } from "redux";
import currency from "./currencyReducer";
import visibilityFilter from "./filterReducer";

const rootReducer = combineReducers({
  currency,
  // visibilityFilter,
});

export default rootReducer;
