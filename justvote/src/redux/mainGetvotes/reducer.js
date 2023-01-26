import * as types from "./types";

const initialState = {
  status: {
    valid: false,
    loading: false,
    voteContents: [],
  },
  getLikeStatus: {
    valid: false,
    loading: false,
    isLikeContents: [],
  },
  addLike: {
    status: "INIT",
  },
  disLike: {
    status: "INIT",
  },
};

export default function getMain(state = initialState, action) {
  switch (action.type) {
    case types.GET_MAIN:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    case types.GET_MAIN_SUCCESS:
      console.log("getMain_Success");
      return {
        ...state,
        status: {
          ...state.status,
          valid: true,
          loading: false,
          voteContents: action.contents,
        },
      };
    case types.GET_MAIN_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          valid: false,
        },
      };

    // like 확인
    case types.GET_LIKE:
      return {
        ...state,
        getLikeStatus: {
          ...state.getLikeStatus,
          loading: true,
        },
      };
    case types.GET_LIKE_SUCCESS:
      console.log("getMain_Success");
      return {
        ...state,
        getLikeStatus: {
          ...state.getLikeStatus,
          valid: true,
          loading: false,
          isLikeContents: action.isLikeContent,
        },
      };
    case types.GET_LIKE_FAILURE:
      return {
        ...state,
        getLikeStatus: {
          ...state.getLikeStatus,
          loading: false,
          valid: false,
        },
      };
    // 게시글 좋아요 기능
    case types.PUSH_LIKE_BT:
      return {
        ...state,
        addLike: {
          status: "WAITING",
        },
      };
    case types.PUSH_LIKE_BT_SUCCESS:
      return {
        ...state,
        addLike: {
          status: "SUCCESS",
        },
      };
    case types.PUSH_LIKE_BT_FAILURE:
      return {
        ...state,
        addLike: {
          status: "FAILURE",
        },
      };

    // 게시글 좋아요 취소 기능
    case types.PUSH_DISLIKE_BT:
      return {
        ...state,
        addLike: {
          status: "WAITING",
        },
      };
    case types.PUSH_DISLIKE_BT_SUCCESS:
      return {
        ...state,
        addLike: {
          status: "SUCCESS",
        },
      };
    case types.PUSH_DISLIKE_BT_FAILURE:
      return {
        ...state,
        addLike: {
          status: "FAILURE",
        },
      };
    case types.GET_MAIN_SEARCH_SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          valid: true,
          loading: false,
          voteContents: action.contents,
        },
      };
    case types.GET_MAIN_SEARCH_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          valid: false,
        },
      };
    case types.GET_MAIN_SEARCH_REQUEST:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    case types.GET_VOTE_DELETED:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    case types.GET_VOTE_DELETED_SUCCESS:
      console.log("울지마 바보야");
      return {
        ...state,
        status: {
          ...state.status,
          valid: true,
          loading: false,
          voteContents: action.contents,
        },
      };
    case types.GET_VOTE_DELETED_FAILURE:
      console.log("울어 시발아");
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          valid: false,
        },
      };
    default:
      return state;
  }
}
