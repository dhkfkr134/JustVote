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

const initialState = {
  get: {
    items: [],
    first: [],
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
    //투표된 요소 SET
    case GET_VOTED_REQUEST:
      return {
        ...state,
        get: {
          ...state.get,
          loading: true,
        },
      };
    case GET_VOTED_SUCCESS:
      console.log(action.votes);
      return {
        ...state,
        get: {
          ...state.get,
          items: action.votes,
          loading: false,
        },
      };
    case GET_VOTED_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          err: action.payload,
          loading: false,
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
    // 댓글 받아오기
    case GET_COMMENT:
      return {
        ...state,
        get: {
          ...state.get,
          loading: true,
        },
      };
    case GET_COMMENT_SUCCESS:
      console.log(action.votes);
      return {
        ...state,
        get: {
          ...state.get,
          items: action.votes,
          loading: false,
        },
      };
    case GET_COMMENT_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          err: action.payload,
          loading: false,
        },
      };
    case GET_FIRST_REQUEST:
      return {
        ...state,
        get: {
          ...state.get,
          loading: true,
        },
      };
    case GET_FIRST_SUCCESS:
      console.log(action.votes);
      return {
        ...state,
        get: {
          ...state.get,
          first: action.voted,
          loading: false,
        },
      };
    case GET_FIRST_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          err: action.payload,
          loading: false,
        },
      };
      case DELETE_COMMENT_REQUEST:
        return {
          ...state,
          get: {
            ...state.get,
            loading: true,
          },
        };
      case DELETE_COMMENT_SUCCESS:
        console.log(action.votes);
        return {
          ...state,
          get: {
            ...state.get,
            items: action.commentID,
            loading: false,
          },
        };
      case DELETE_COMMENT_FAILURE:
        return {
          ...state,
          get: {
            ...state.get,
            err: action.payload,
            loading: false,
          },
        };
      

    default:
      return state;
  }
};
export default getVotesReducer;