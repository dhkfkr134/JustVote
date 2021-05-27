import * as types from "./types";

const initialState = {
  post: {
    status: "INIT",
    error: -1,
  },
  list: {
    status: "INIT",
    data: [],
    isLast: false,
  },
  edit: {
    status: "INIT",
    error: -1,
  },
  remove: {
    status: "INIT",
    error: -1,
  },
  star: {
    status: "INIT",
    error: -1,
  },
};

export default function vote(state = initialState, action) {
  switch (action.type) {
    case types.VOTE_POST:
      return {
        ...state,
        post: {
          ...state.post,
          status: "WAITING",
          error: -1,
        },
      };
    case types.VOTE_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          status: "SUCCESS",
        },
      };
    case types.VOTE_POST_FAILURE:
      return {
        ...state,
        post: {
          ...state.post,
          status: "FAILURE",
          error: action.error,
        },
      };
    default:
      return state;
  }
}

// export const votes = (state = [], action) => {
//     switch(action.type) {
//         case SET_VOTES:
//             return action.votes;
//         default:
//             return state;
//     }
// };

// export const currentVote = (state = {}, action) => {
//     switch (action.type) {
//         case SET_CURRENT_VOTES:
//             return action.vote;
//         default:
//             return state;
//     }
// }
