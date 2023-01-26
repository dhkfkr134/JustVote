import axios from "axios";
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  DUPLICATE,
  DUPLICATE_NOT,
  DUPLICATE_YES,
  DUPLICATE_NICKNAME,
  DUPLICATE_NICKNAME_NOT,
  DUPLICATE_NICKNAME_YES,
} from "./types";

/* DUPLICATE USER ID */

export function duplicateCheckRequest(userID) {
  return (dispatch) => {
    // Inform Register API is starting
    dispatch(duplicateCheck());

    return axios
      .post("http://localhost:8080/duplicateCheck", userID)
      .then((response) => {
        // useable this userID
        dispatch(duplicateNot());
      })
      .catch((error) => {
        // request change userID
        dispatch(duplicateYes());
      });
  };
}

export function duplicateCheck() {
  return {
    type: DUPLICATE,
  };
}

export function duplicateNot() {
  return {
    type: DUPLICATE_NOT,
  };
}

export function duplicateYes() {
  return {
    type: DUPLICATE_YES,
  };
}

/* DUPLICATE NICKNAME */

export function duplicateCheckNicknameRequest(nickName) {
  return (dispatch) => {
    dispatch(duplicateNicknameCheck());

    return axios
      .post("http://localhost:8080/nickNameCheck", nickName)
      .then((response) => {
        // useable this Nickname
        dispatch(duplicateNicknameNot());
      })
      .catch((error) => {
        // request change Nickname
        dispatch(duplicateNicknameYes());
      });
  };
}

export function duplicateNicknameCheck() {
  return {
    type: DUPLICATE_NICKNAME,
  };
}

export function duplicateNicknameNot() {
  return {
    type: DUPLICATE_NICKNAME_NOT,
  };
}

export function duplicateNicknameYes() {
  return {
    type: DUPLICATE_NICKNAME_YES,
  };
}

/* REGISTER */
export function registerRequest(body) {
  return (dispatch) => {
    // Inform Register API is starting
    dispatch(register());

    console.log(body);

    return axios
      .post("http://localhost:8080/register", body)
      .then((response) => {
        // SUCCEED
        dispatch(registerSuccess());
      })
      .catch((error) => {
        dispatch(registerFailure());
      });
  };
}

export function register() {
  return {
    type: REGISTER,
  };
}

export function registerSuccess() {
  return {
    type: REGISTER_SUCCESS,
  };
}

export function registerFailure() {
  return {
    type: REGISTER_FAILURE,
  };
}
