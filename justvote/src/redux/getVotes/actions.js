import axios from "axios";
import {
  GET_VOTES_FAILURE,
  GET_VOTES_REQUEST,
  GET_VOTES_SUCCESS,
  GET_VOTED_FAILURE,
  GET_VOTED_REQUEST,
  GET_VOTED_SUCCESS,
  GET_COMMENT,
  GET_COMMENT_FAILURE,
  GET_COMMENT_SUCCESS,
  REGISTER_COMMENT,
  REGISTER_COMMENT_SUCCESS,
  REGISTER_COMMENT_FAILURE,
  GET_FIRST_REQUEST,
  GET_FIRST_FAILURE,
  GET_FIRST_SUCCESS,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
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
// 투표된 목록 불러오기
export function getVotedSuccess(votes) {
  return {
    type: GET_VOTED_SUCCESS,
    votes,
  };
}
export function getVotedFailure(error) {
  return {
    type: GET_VOTED_FAILURE,
    payload: error,
  };
}
export function getVotedREQUEST() {
  return {
    type: GET_VOTED_REQUEST,
  };
}
export function getVoted(nam, sid, userId) {
  return (dispatch) => {
    dispatch(getVotedREQUEST());
    return axios
      .get("http://localhost:8080/voteCount", {
        params: {
          voteID: nam,
          selecID: sid,
          userID: userId,
        },
      })
      .then((response) => {
        dispatch(getVotedSuccess(response.data));
      })
      .catch((error) => dispatch(getVotedFailure(error)));
  };
}
// 댓글 등록 기능
// export function registerCommentRequest(body) {
//   return (dispatch) => {
//     dispatch(registerComment());

//     return axios
//       .post("http://localhost:8080/registerComment", body)
//       .then((response) => {
//         dispatch(registerCommentSuccess());
//       })
//       .catch((error) => {
//         dispatch(registerCommentFailure());
//       });
//   };
// }

// export function registerComment() {
//   return {
//     type: REGISTER_COMMENT,
//   };
// }

// export function registerCommentSuccess() {
//   return {
//     type: REGISTER_COMMENT_SUCCESS,
//   };
// }

// export function registerCommentFailure() {
//   return {
//     type: REGISTER_COMMENT_FAILURE,
//   };
// }
// 댓글 입력 및 불러오기
export function getCommentRequest(comment, nam, userId) {
  return (dispatch) => {
    dispatch(getComment());
    return axios
      .get("http://localhost:8080/showComment", {
        params: {
          commentContent: comment,
          voteID: nam,
          userID: userId,
        },
      })
      .then((response) => {
        dispatch(getCommentSuccess(response.data));
      })
      .catch((error) => dispatch(getCommentFailure(error)));
  };
}
export function getComment() {
  return {
    type: GET_COMMENT,
  };
}

export function getCommentSuccess(votes) {
  return {

    type: GET_COMMENT_SUCCESS,
    votes,
  };
}

export function getCommentFailure() {
  return {
    type: GET_COMMENT_FAILURE,
  };
}
//투표했는지 확인
export function getFirstSuccess(voted) {
  return {
    type: GET_FIRST_SUCCESS,
    voted,
  };
}
export function getFirstFailure(error) {
  return {
    type: GET_FIRST_FAILURE,
    payload: error,
  };
}
export function getFirstRequest() {
  return {
    type: GET_FIRST_REQUEST,
  };
}
export function getFirst(nam, userId) {
  return (dispatch) => {
    dispatch(getFirstRequest());
    return axios
      .get("http://localhost:8080/contentVoted", {
        params: {
          voteID: nam,
          userID: userId,
        },
      })
      .then((response) => {
        dispatch(getFirstSuccess(response.data));
      })
      .catch((error) => dispatch(getFirstFailure(error)));
  };
}
// 댓글 삭제 기능
export function deleteCommentRequest() {
  return {
    type: DELETE_COMMENT_REQUEST,
  };
}
export function deleteCommentSuccess(commentID) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    commentID
  };
}
export function deleteCommentFailure(error) {
  return {
    type: DELETE_COMMENT_FAILURE,
    payload: error,
  };
}
export function deleteComment(nam, commentID) {

  return (dispatch) => {
    dispatch(deleteCommentRequest());
    return axios
      .get("http://localhost:8080/deleteComment", {
        params: {
          voteID: nam,
          commentID: commentID,
        },
      })
      .then((response) => {
        dispatch(deleteCommentSuccess(response.data));
      })
      .catch((error) => dispatch(getCommentFailure(error)));
  };
}