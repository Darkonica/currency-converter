import initialState from "./initialState";
import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  TOGGLE_FAVORITE,
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

    case TOGGLE_FAVORITE:
      const favorites = state.favorites.includes(action.currency)
        ? state.favorites.filter(fav => fav !== action.currency)
        : state.favorites.concat(action.currency);
      return {
        ...state,
        favorites,
      };

    default:
      return state;
  }
}
