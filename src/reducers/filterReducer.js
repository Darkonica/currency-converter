import initialState from "./initialState";
import { SET_VISIBILITY_FILTER } from "../actions/actionTypes";

export default function filters(state = initialState.visibilityFilter, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}
