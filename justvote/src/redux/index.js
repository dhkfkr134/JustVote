/* (각 기능별) 모든 action들을 export해주는 코드 작성 */

export {
  getVoted,
  getVotes,
  getCommentRequest,
  getFirst,
  deleteComment,
} from "./getVotes/actions";

export {
  getMainSearch,
  getMainRequest,
  getLikeRequest,
  pushLikeBtRequest,
  pushDislikeBtRequest,
 } from "./mainGetvotes/actions";
