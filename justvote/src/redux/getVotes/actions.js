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
      .get("https://jsonplaceholder.typicode.com/comment")
      .then((response) => dispatch(getVotesSuccess(response.data)))
      .catch((error) => dispatch(getVotesFailure(error)));
    // .then(votes =>
    //     dispatch(getVotesSuccess(votes)))
    // .catch(error => ))
  };
}

// 댓글 등록 기능
export function registercommentRequest(body) {
  return (dispatch) => {
    dispatch(registercomment());

    // let body = {
    //   // ID도 넣어주기
    //   voteTitle: voteTitle,
    //   comment: comment,
    // };

    console.log(body);
    return axios
      .post("http://localhost:8080/registercomment", body)
      .then((response) => {
        dispatch(registercommentSuccess());
      })
      .catch((error) => {
        dispatch(registercommentFailure());
      });
  };
}

export function registercomment() {
  console.log("registercomment");
  return {
    type: REGISTER_COMMENT,
  };
}

export function registercommentSuccess() {
  console.log("registercommentSuccess");
  return {
    type: REGISTER_COMMENT_SUCCESS,
  };
}

export function registercommentFailure() {
  console.log("registercommentFailure");
  return {
    type: REGISTER_COMMENT_FAILURE,
  };
}
