import axios from "axios";
import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_GET_STATUS,
  AUTH_GET_STATUS_SUCCESS,
  AUTH_GET_STATUS_FAILURE,
} from "./types";

/* LOGIN */
export function loginRequest(userId, userPass) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(login());

    let body = {
      userId: userId,
      userPass: userPass,
    };

    console.log("LoginBody: " + body.userId + " / " + body.userPass);

    // API REQUEST
    return axios
      .post("http://localhost:8080/signin", body)
      .then((response) => {
        // SUCCEED
        dispatch(loginSuccess(userId));
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

export function loginSuccess(userId) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    userId,
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
      .get("/api/account/getInfo")
      .then((response) => {
        dispatch(getStatusSuccess(response.data.info.username)); //HTTP 틍신을 통해 username을 빋이옴
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

export function getStatusSuccess(username) {
  return {
    type: AUTH_GET_STATUS_SUCCESS,
    username,
  };
}

export function getStatusFailure() {
  return {
    type: AUTH_GET_STATUS_FAILURE,
  };
}
