import {
  GET_VOTES_FAILURE,
  GET_VOTES_REQUEST,
  GET_VOTES_SUCCESS,
  REGISTER_COMMENT,
  REGISTER_COMMENT_SUCCESS,
  REGISTER_COMMENT_FAILURE,
  DELETE_COMMENT,
  SET_VOTES,
  SET_VOTES_SUCCESS,
  SET_VOTES_FAILURE,
} from "./types";

const initialState = {
  get: {
    items: [],
    loading: false,
    err: null,
  },
  register: {
    status: "INIT",
    error: -1,
  },
  post: {
    status: "INIT",
    error: -1,
  },
};

const getVotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VOTES_REQUEST:
      return {
        ...state,
        get: {
          ...state.get,
          loading: true,
        },
      };
    case GET_VOTES_SUCCESS:
      console.log(action.votes);
      return {
        ...state,
        get: {
          ...state.get,
          items: action.votes,
          loading: false,
        },
      };
    case GET_VOTES_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          err: action.payload,
          loading: false,
        },
      };
    //화면구성요소 SET
    case SET_VOTES:
      return {
        ...state,
        post: {
          ...state.post,
          status: "WAITING",
          error: -1,
        },
      };
    case SET_VOTES_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          status: "SUCCESS",
        },
      };
    case SET_VOTES_FAILURE:
      return {
        ...state,
        post: {
          ...state.post,
          status: "FAILURE",
          error: action.error,
        },
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
