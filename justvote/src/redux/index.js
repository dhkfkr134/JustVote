/* (각 기능별) 모든 action들을 export해주는 코드 작성 */

export { addSubscriber, removeSubscriber } from "./subscribers/actions";
export { addView } from "./views/actions";
export {
  getVotes,
  setVotesRequest,
  registerCommentRequest,
} from "./getVotes/actions";

export { getMainRequest } from "./mainGetvotes/actions";
