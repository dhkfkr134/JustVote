import axios from "axios";
import {
  GET_VOTES_FAILURE,
  GET_VOTES_REQUEST,
  GET_VOTES_SUCCESS,
  REGISTER_COMMENT,
  REGISTER_COMMENT_SUCCESS,
  REGISTER_COMMENT_FAILURE,
  DELETE_COMMENT,
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
      .get("https://jsonplaceholder.typicode.com/Comment")
      .then((response) => dispatch(getVotesSuccess(response.data)))
      .catch((error) => dispatch(getVotesFailure(error)));
    // .then(votes =>
    //     dispatch(getVotesSuccess(votes)))
    // .catch(error => ))
  };
}

// 댓글 등록 기능
export function registerCommentRequest(body) {
  return (dispatch) => {
    dispatch(registerComment());

    // let body = {
    //   // ID도 넣어주기
    //   voteTitle: voteTitle,
    //   Comment: Comment,
    // };

    console.log(body);
    return axios
      .post("http://localhost:8080/registerComment", body)
      .then((response) => {
        dispatch(registerCommentSuccess());
      })
      .catch((error) => {
        dispatch(registerCommentFailure());
      });
  };
}

export function registerComment() {
  return {
    type: REGISTER_COMMENT,
  };
}

export function registerCommentSuccess() {
  return {
    type: REGISTER_COMMENT_SUCCESS,
  };
}

export function registerCommentFailure() {
  return {
    type: REGISTER_COMMENT_FAILURE,
  };
}

// 댓글 삭제 기능
export function deleteCommentRequest(body) {
  return (dispatch) => {
    console.log(body);
    return axios
      .post("http://localhost:8080/deleteComment", body)
      .then((response) => {
        dispatch(deleteComment());
      });
  };
}

export function deleteComment() {
  return {
    type: DELETE_COMMENT,
  };
}
