import axios from "axios";
import {
  GET_MAIN_FAILURE,
  GET_MAIN_SUCCESS,
  GET_MAIN,
  GET_LIKE_FAILURE,
  GET_LIKE_SUCCESS,
  GET_LIKE,
  PUSH_LIKE_BT_FAILURE,
  PUSH_LIKE_BT_SUCCESS,
  PUSH_LIKE_BT,
  PUSH_DISLIKE_BT_FAILURE,
  PUSH_DISLIKE_BT_SUCCESS,
  PUSH_DISLIKE_BT,
} from "./types";

// 화면 구성요소 GET
/* GET Main */
export function getMainRequest(category, userID) {
  return (dispatch) => {
    // inform Get Status API is starting
    dispatch(getMainStatus());
    console.log(userID)

    return axios
      .get("http://localhost:8080/main", {
        params: {
          category: category,
         
        },
      })
      .then((response) => {
        dispatch(getMainSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(getMainFailure());
      });
  };
}

export function getMainStatus() {
  return {
    type: GET_MAIN,
  };
}

export function getMainSuccess(contents) {
  return {
    type: GET_MAIN_SUCCESS,
    contents,
  };
}

export function getMainFailure() {
  return {
    type: GET_MAIN_FAILURE,
  };
}

// Like / DisLike 확인
export function getLikeRequest(category, userID) {
  return (dispatch) => {
    // inform Get Status API is starting
    dispatch(getLikeStatus());
    console.log(category)
    console.log(userID)
    
    return axios
      .get("http://localhost:8080/getLike", {
        params: {
          category: category,
          
        },
      })
      .then((response) => {
        dispatch(getLikeSuccess(response.data));
        console.log(response.data);
      })
      .catch(() => {
        dispatch(getLikeFailure());
      });
  };
}

export function getLikeStatus() {
  return {
    type: GET_LIKE,
  };
}

export function getLikeSuccess(isLikeContent) {
  return {
    type: GET_LIKE_SUCCESS,
    isLikeContent,
  };
}

export function getLikeFailure() {
  return {
    type: GET_LIKE_FAILURE,
  };
}

// 좋아요 기능
export function pushLikeBtRequest(body) {
  return (dispatch) => {
    // inform Get Status API is starting
    dispatch(pushLikeBtStatus());
    console.log(body)
    return axios
      .post("http://localhost:8080/pushLikeBT", body)
      .then((response) => {
        dispatch(pushLikeBtSuccess());
      })
      .catch((error) => {
        dispatch(pushLikeBtFailure());
      });
  };
}

export function pushLikeBtStatus() {
  return {
    type: PUSH_LIKE_BT,
  };
}

export function pushLikeBtSuccess() {
  return {
    type: PUSH_LIKE_BT_SUCCESS,
  };
}

export function pushLikeBtFailure() {
  return {
    type: PUSH_LIKE_BT_FAILURE,
  };
}

// 좋아요 취소 기능
export function pushDislikeBtRequest(body) {
  return (dispatch) => {
    // inform Get Status API is starting
    dispatch(pushDislikeBtStatus());
    console.log(body)

    return axios
      .post("http://localhost:8080/pushDislikeBT", body)
      .then((response) => {
        dispatch(pushDislikeBtSuccess());
      })
      .catch((error) => {
        dispatch(pushDislikeBtFailure());
      });
  };
}

export function pushDislikeBtStatus() {
  return {
    type: PUSH_DISLIKE_BT,
  };
}

export function pushDislikeBtSuccess() {
  return {
    type: PUSH_DISLIKE_BT_SUCCESS,
  };
}

export function pushDislikeBtFailure() {
  return {
    type: PUSH_DISLIKE_BT_FAILURE,
  };
}
