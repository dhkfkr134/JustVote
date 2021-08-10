import axios from "axios";
import {
  VOTE_POST,
  VOTE_POST_SUCCESS,
  VOTE_POST_FAILURE,
} from "./types";

export function votePostRequest(body) {
  return (dispatch) => {
    dispatch(votePost());

    console.log(body);
    return axios
      .post("http://localhost:8080/makeVote", body)
      .then((response) => {
        dispatch(votePostSuccess());
      })
      .catch((error) => {
        dispatch(votePostFailure());
      });
  };
}

export function votePost() {
  return {
    type: VOTE_POST,
  };
}

export function votePostSuccess() {
  console.log("votePostSuccess");
  return {
    type: VOTE_POST_SUCCESS,
  };
}

export function votePostFailure() {
  console.log("votePostFail");
  return {
    type: VOTE_POST_FAILURE,
  };
}
