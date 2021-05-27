import {
    GET_VOTES_FAILURE,
    GET_VOTES_REQUEST,
    GET_VOTES_SUCCESS
} from './types';

const initialState = {
    items: [],
    loading: false,
    err: null
}

const getVotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VOTES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_VOTES_SUCCESS:
            return {
                ...state,
                items: action.payload,
                loading: false,
            }
        case GET_VOTES_FAILURE:
            return {
                ...state,
                err: action.payload,
                loading: false,
            }
        default: return state;
    }
}
export default getVotesReducer