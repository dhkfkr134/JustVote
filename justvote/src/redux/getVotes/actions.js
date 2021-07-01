import axios from "axios";
import {
  GET_VOTES_FAILURE,
  GET_VOTES_REQUEST,
  GET_VOTES_SUCCESS,
  REGISTER_COMMENT,
  REGISTER_COMMENT_SUCCESS,
  REGISTER_COMMENT_FAILURE,
  DELETE_COMMENT,
  SET_VOTES,
  SET_VOTES_FAILURE,
  SET_VOTES_SUCCESS,
} from "./types";

// 화면 구성요소 GET
export function getVotesSuccess(votes) {
  return {
    type: GET_VOTES_SUCCESS,
    votes,
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

export function getVotes(nam) {
  return (dispatch) => {
    dispatch(getVotesREQUEST());
    return axios
      .get("http://localhost:8080/content", {
        params: {
          voteID: nam,
        },
      })
      .then((response) => {
        dispatch(getVotesSuccess(response.data));
      })
      .catch((error) => dispatch(getVotesFailure(error)));
  };
  //   return axios
  //     .get("http://localhost:8080/content/3")
  //     .then((response) => {
  //       dispatch(getVotesSuccess())
  //     })
  //     .catch((error) => dispatch(getVotesFailure(error)));
  // };
}

// 화면 구성요소 SET
export function setVotesRequest(body) {
  return (dispatch) => {
    dispatch(setVotes());

    return axios
      .post("http://localhost:8080/setVote", body)
      .then((response) => dispatch(setVotesSuccess()))
      .catch((error) => dispatch(setVotesFailure()));
  };
}
export function setVotesSuccess() {
  return {
    type: SET_VOTES_SUCCESS,
  };
}
export function setVotesFailure() {
  return {
    type: SET_VOTES_FAILURE,
  };
}
export function setVotes() {
  return {
    type: SET_VOTES,
  };
}

// 댓글 등록 기능
export function registerCommentRequest(body) {
  return (dispatch) => {
    dispatch(registerComment());

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
