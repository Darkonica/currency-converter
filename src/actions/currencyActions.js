import * as types from "./actionTypes";

const baseUrl = "https://api.exchangeratesapi.io/latest";

export function fetchData(base = "") {
  const url = base ? baseUrl + "?base=" + base : baseUrl;
  console.log(url);
  return dispatch => {
    dispatch(fetchDataBegin());
    return fetch(url)
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
