import axios from "axios";
import {
  GET_VOTES_FAILURE,
  GET_VOTES_REQUEST,
  GET_VOTES_SUCCESS,
  REGISTER_COMMENT,
  REGISTER_COMMENT_SUCCESS,
  REGISTER_COMMENT_FAILURE,
} from "./types";

export function getVotesSuccess(votes) {
  return {
    type: GET_VOTES_SUCCESS,
    payload: votes,
  };
}
export function getVotesFailure(error) {
  return {
    type: GET_VOTES_FAILURE,
    payload: error,
  };
}
export function getVotesREQUEST() {
  return {
    type: GET_VOTES_REQUEST,
  };
}
export function getVotes() {
  return (dispatch) => {
    dispatch(getVotesREQUEST());
    return axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => dispatch(getVotesSuccess(response.data)))
      .catch((error) => dispatch(getVotesFailure(error)));
    // .then(votes =>
    //     dispatch(getVotesSuccess(votes)))
    // .catch(error => ))
  };
}

// 댓글 등록 기능
export function registerCommentsRequest(body) {
  return (dispatch) => {
    dispatch(registerComments());

    // let body = {
    //   // ID도 넣어주기
    //   voteTitle: voteTitle,
    //   comments: comments,
    // };

    console.log(body);
    return axios
      .post("http://localhost:8080/registerComments", body)
      .then((response) => {
        dispatch(registerCommentsSuccess());
      })
      .catch((error) => {
        dispatch(registerCommentsFailure());
      });
  };
}

export function registerComments() {
  console.log("registerComments");
  return {
    type: REGISTER_COMMENT,
  };
}

export function registerCommentsSuccess() {
  console.log("registerCommentsSuccess");
  return {
    type: REGISTER_COMMENT_SUCCESS,
  };
}

export function registerCommentsFailure() {
  console.log("registerCommentsFailure");
  return {
    type: REGISTER_COMMENT_FAILURE,
  };
}
