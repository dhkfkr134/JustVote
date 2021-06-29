import axios from "axios";
import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_GET_STATUS,
  AUTH_GET_STATUS_SUCCESS,
  AUTH_GET_STATUS_FAILURE,
  AUTH_LOGOUT,
} from "./types";

/* LOGIN */
export function loginRequest(userID, userPass) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(login());

    let body = {
      userID: userID,
      userPass: userPass,
    };

    console.log(body);

    // API REQUEST
    return axios
      .post("http://localhost:8080/signin", body)
      .then((response) => {
        // SUCCEED
        dispatch(loginSuccess(userID));
      })
      .catch((error) => {
        // FAILED
        dispatch(loginFailure());
      });
  };
}

export function login() {
  return {
    type: AUTH_LOGIN,
  };
}

export function loginSuccess(userID) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    userID,
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE,
  };
}

/* GET STATUS */
export function getStatusRequest() {
  return (dispatch) => {
    // inform Get Status API is starting
    dispatch(getStatus());

    return axios
      .get("http://localhost:8080/getInfo")
      .then((response) => {
        dispatch(getStatusSuccess(response.data)); //HTTP 틍신을 통해 userId을 빋이옴
      })
      .catch((error) => {
        dispatch(getStatusFailure());
      });
  };
}

export function getStatus() {
  return {
    type: AUTH_GET_STATUS,
  };
}

export function getStatusSuccess(userID) {
  return {
    type: AUTH_GET_STATUS_SUCCESS,
    userID,
  };
}

export function getStatusFailure() {
  return {
    type: AUTH_GET_STATUS_FAILURE,
  };
}

/* Logout */
export function logoutRequest() {
  return (dispatch) => {
    return axios.post("http://localhost:8080/logout").then((response) => {
      dispatch(logout());
    });
  };
}

export function logout() {
  return {
    type: AUTH_LOGOUT,
  };
}
