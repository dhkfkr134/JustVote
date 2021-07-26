/* (각 기능별) 모든 action들을 export해주는 코드 작성 */

export {
  getVotes,
  setVotesRequest,
  registerCommentRequest,
} from "./getVotes/actions";

export {
  getMainRequest,
  getLikeRequest,
  pushLikeBtRequest,
  pushDislikeBtRequest,
} from "./mainGetvotes/actions";
