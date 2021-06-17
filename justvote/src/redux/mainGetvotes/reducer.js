/* LOGIN */
import * as types from "./types";

const initialState = {
  status: {
    valid: false,
    loading: false,
    voteContents: [],
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
    default:
      return state;
  }
}
