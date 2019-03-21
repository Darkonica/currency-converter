import { combineReducers } from "redux";
import currency from "./currencyReducer";

const rootReducer = combineReducers({
  currency,
});

export default rootReducer;
