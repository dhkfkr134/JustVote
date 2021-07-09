import axios from "axios";
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  DUPLICATE,
  DUPLICATE_NOT,
  DUPLICATE_YES,
} from "./types";

/* DUPLICATE */

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
