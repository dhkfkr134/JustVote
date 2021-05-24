/* LOGIN */
import * as types from "./types";

const initialState = {
  login: {
    status: "INIT",
  },
  register: {
    status: "INIT",
    error: -1,
  },
  status: {
    valid: false,
    isLoggedIn: false,
    currentUser: "",
  },
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_LOGIN:
      console.log("login_wait");
      return {
        ...state,
        login: {
          status: "WAITING",
        },
      };
    case types.AUTH_LOGIN_SUCCESS:
      console.log("login_success");
      return {
        ...state,
        login: {
          status: "SUCCESS",
        },
        status: {
          ...state.status,
          isLoggedIn: true,
          currentUser: action.userId,
        },
      };
    case types.AUTH_LOGIN_FAILURE:
      console.log("login_failure");
      return {
        ...state,
     