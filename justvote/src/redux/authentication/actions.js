import axios from "axios";
import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE } from "./types";

/* LOGIN */
export function loginRequest(userId, userPass) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(login());
    console.log("userId: " + this.userId);
    console.log("userPass: " + this.userPass);

    let body = {
      userId: this.userId,
      userPass: this.userPass,
    };

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