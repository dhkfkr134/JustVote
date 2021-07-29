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
    currentUser: "NONE",
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
          currentUser: action.userID,
        },
      };
    case types.AUTH_LOGIN_FAILURE:
      console.log("login_failure");
      return {
        ...state,
        login: {
          status: "FAILURE",
        },
      };
    default:
      return state;
    /* CHECK SESSIONS */
    case types.AUTH_GET_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
        },
      };
    case types.AUTH_GET_STATUS_SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          valid: true,
          isLoggedIn: true,
          currentUser: action.userID,
        },
      };
    case types.AUTH_GET_STATUS_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          valid: false,
          isLoggedIn: false,
        },
      };
    /* LOGOUT */
    case types.AUTH_LOGOUT:
      return {
        ...state,
        status: {
          ...state.status,
          valid: false,
          isLoggedIn: false,
          currentUser: "NONE",
        },
      };
  }
}
