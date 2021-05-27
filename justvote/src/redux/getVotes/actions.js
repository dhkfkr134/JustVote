import axios from "axios";
import {
    GET_VOTES_FAILURE,
    GET_VOTES_REQUEST,
    GET_VOTES_SUCCESS
} from './types';

function getVotesSuccess(votes) {
    return {
        type: GET_VOTES_SUCCESS,
        payload: votes,
    }
}
function getVotesFailure(error) {
    return {
        type: GET_VOTES_FAILURE,
        payload: error,
    }
}
function getVotesREQUEST() {
    return {
        type: GET_VOTES_REQUEST,
    }
}
export function getVotes() {
    return (dispatch) => {
        dispatch(getVotesREQUEST())
        return axios.get("http://localhost:8080/justvote")
            .then(response => response.json())
            .then(comments =>
                dispatch(getVotesSuccess(comments)))
            .catch(error => dispatch(getVotesFailure(error)))
    }
}