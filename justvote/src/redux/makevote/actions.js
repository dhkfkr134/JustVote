import axios from "axios";
import {
  VOTE_POST,
  VOTE_POST_SUCCESS,
  VOTE_POST_FAILURE,
  // SET_VOTES,
  // SET_CURRENT_VOTES,
} from "./types";

// import API from '../../services/api';
// import { addError, removeError } from '../error/actions';

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

// export function setVotes(votes) {
//     return {
//         type: SET_VOTES,
//         votes
//     };
// }

// export function setCurrentVotes(vote) {
//     return {
//         type: SET_CURRENT_VOTES,
//         vote,
//     };
// }

// export function getVotes(){
//     return async dispatch => {
//        try{
//            const votes = await API.call('get','votes');
//            dispatch(setVotes(votes));
//            dispatch(removeError());
//        }catch (err) {
//            const error = err.response.data;
//            dispatch(addError(error.message));
//        }
//     }
// }

// export function getUserVotes() {
//     return async dispatch => {
//         try{
//             const votes = await API.call('get','votes/user');
//             dispatch(setVotes(votes));
//             dispatch(removeError());
//         }catch(err) {
//             const error = err.reponse.data;
//             dispatch(addError(error.message))
//         }
//     }
// }
// export function CreateVotes(data) {
//     return async dispatch => {
//         try{
//             const vote = await API.call('post','votes', data);
//             dispatch(setCurrentVotes(vote));
//             dispatch(removeError());
//         }catch(err) {
//             const error = err.reponse.data;
//             dispatch(addError(error.message))
//         }
//     }
// }
// export function getCurrentPolls(path) {
//     return async dispatch => {
//         try{
//             const vote = await API.call('get',`votes/${path}`);
//             dispatch(setVotes(vote));
//             dispatch(removeError());
//         }catch(err) {
//             const error = err.reponse.data;
//             dispatch(addError(error.message))
//         }
//     }
// }
// export function vote(path, data) {
//     return async dispatch => {
//         try{
//             const vote = await API.call('post',`votes/${path}`, data);
//             dispatch(setVotes(vote));
//         }catch(err) {
//             const error = err.reponse.data;
//             dispatch(addError(error.message))
//         }
//     }
// }
