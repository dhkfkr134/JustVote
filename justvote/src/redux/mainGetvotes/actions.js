import axios from "axios";
import { GET_MAIN_FAILURE, GET_MAIN_SUCCESS, GET_MAIN } from "./types";

// 화면 구성요소 GET
/* GET Main */
export function getMainRequest() {
  return (dispatch) => {
    // inform Get Status API is starting
    dispatch(getMainStatus());

    return axios
      .get("http://localhost:8080/getMain")
      .then((response) => {
        dispatch(getMainSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(getMainFailure());
      });
  };
}

export function getMainStatus() {
  return {
    type: GET_MAIN,
  };
}

export function getMainSuccess(contents) {
  return {
    type: GET_MAIN_SUCCESS,
    contents,
  };
}

export function getMainFailure() {
  return {
    type: GET_MAIN_FAILURE,
  };
}
