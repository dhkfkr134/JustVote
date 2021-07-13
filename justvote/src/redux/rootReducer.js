/* 모든 reducer를 store.js에 넘겨주기 위해 모아주는 곳 */
import { combineReducers } from "redux";
import authentication from "./authentication/reducer";
import vote from "./makevote/reducer";
import getVoteReducer from "./getVotes/reducer";
import getMain from "./mainGetvotes/reducer";
import register from "./signup/reducer";

const rootReducer = combineReducers({
  register: register,
  authentication: authentication,
  vote: vote,
  votes: getVoteReducer,
  contents: getMain,
});

export default rootReducer;
