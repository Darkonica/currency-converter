import * as types from "./actionTypes";

const baseUrl = "https://api.exchangeratesapi.io/latest";

export function fetchData(base = "") {
  const url = base ? baseUrl + "?base=" + base : baseUrl;
  return dispatch => {
    dispatch(fetchDataBegin());
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.rates) {
          if (!data.rates[base]) data.rates[base] = 1;
          dispatch(fetchDataSuccess(data));
        } else {
          dispatch(fetchDataError(data));
        }
      })
      .catch(err => dispatch(fetchDataError(err)));
  };
}

export function fetchDataBegin() {
  return {
    type: types.FETCH_DATA_BEGIN,
  };
}

export function fetchDataSuccess(payload) {
  return {
    type: types.FETCH_DATA_SUCCESS,
    payload,
  };
}

export function fetchDataError(errorText) {
  return {
    type: types.FETCH_DATA_ERROR,
    errorText,
  };
}

export function toggleFavorite(currency) {
  return {
    type: types.TOGGLE_FAVORITE,
    currency,
  };
}
