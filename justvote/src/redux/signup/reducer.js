/* REGISTER */
import * as types from "./types";

const initialState = {
  register: {
    status: "INIT",
  },
  duplicate: {
    status: "INIT",
  },
  duplicateNickname: {
    status: "INIT",
  },
};

export default function register(state = initialState, action) {
  switch (action.type) {
    /* REGISTER */
    case types.REGISTER:
      return {
        ...state,
        register: {
          status: "WAITING",
        },
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          status: "SUCCESS",
        },
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        register: {
          status: "FAILURE",
        },
      };

    /* DUPLICATE CHECK USER_ID */
    case types.DUPLICATE:
      return {
        ...state,
        duplicate: {
          status: "WAITING",
        },
      };
    case types.DUPLICATE_NOT:
      return {
        ...state,
        duplicate: {
          status: "ABLE",
        },
      };
    case types.DUPLICATE_YES:
      return {
        ...state,
        duplicate: {
          status: "UNABLE",
        },
      };

    /* DUPLICATE CHECK NICKNAME */
    case types.DUPLICATE_NICKNAME:
      return {
        ...state,
        duplicateNickname: {
          status: "WAITING",
        },
      };
    case types.DUPLICATE_NICKNAME_NOT:
      return {
        ...state,
        duplicateNickname: {
          status: "ABLE",
        },
      };
    case types.DUPLICATE_NICKNAME_YES:
      return {
        ...state,
        duplicateNickname: {
          status: "UNABLE",
        },
      };
    default:
      return state;
  }
}
