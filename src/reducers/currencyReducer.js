import initialState from "./initialState";
import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from "../actions/actionTypes";

export default function currency(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        currencyList: action.payload,
      };

    case FETCH_DATA_ERROR:
      return {
        ...state,
        currencyList: [],
        loading: false,
        error: true,
        errorText: action.errorText ? action.errorText : null,
      };

    default:
      return state;
  }
}
