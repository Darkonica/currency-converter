import * as types from "./actionTypes";

export function fetchData() {
  return dispatch => {
    dispatch(fetchDataBegin());
    return fetch("https://api.exchangeratesapi.io/latest")
      .then(res => res.json())
      .then(data =>
        data.rates
          ? dispatch(fetchDataSuccess(data))
          : dispatch(fetchDataError(data))
      )
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
