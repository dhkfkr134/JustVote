/* 모든 reducer를 store.js에 넘겨주기 위해 모아주는 곳 */
import { combineReducers } from "redux";
import subscribersReducer from "./subscribers/reducer";
import viewsReducer from "./views/reducer";
import authentication from "./authentication/reducer";
import vote from "./makevote/reducer";
import getVoteReducer from "./getVotes/reducer";
import getMain from "./mainGetvotes/reducer";

const rootReducer = combineReducers({
  views: viewsReducer,
  subscribers: subscribersReducer,
  authentication: authentication,
  vote: vote,
  votes: getVoteReducer,
  contents: getMain,
});

export default rootReducer;
