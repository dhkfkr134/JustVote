import {
  GET_VOTES_FAILURE,
  GET_VOTES_REQUEST,
  GET_VOTES_SUCCESS,
  REGISTER_COMMENT,
  REGISTER_COMMENT_SUCCESS,
  REGISTER_COMMENT_FAILURE,
  DELETE_COMMENT,
} from "./types";

const initialState = {
  items: [],
  loading: false,
  err: null,
  register: {
    status: "INIT",
    error: -1,
  },
};

const getVotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VOTES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_VOTES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case GET_VOTES_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      };
    // 댓글 기능
    case REGISTER_COMMENT:
      return {
        ...state,
        register: {
          ...state.register,
          status: "WAITING",
          error: -1,
        },
      };
    case REGISTER_COMMENT_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          status: "SUCCESS",
        },
      };
    case REGISTER_COMMENT_FAILURE:
      return {
        ...state,
        register: {
          ...state.register,
          status: "FAILURE",
          error: action.error,
        },
      };
    case DELETE_COMMENT:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default getVotesReducer;
