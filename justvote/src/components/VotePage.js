import React, { useEffect, useState } from "react";
import * as RBS from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getVotes, getCommentRequest, getVoted, getFirst, deleteComment } from "../redux";
import testImage from "../img/content_img.png";
import CommentCard from "./CommentCard";

import image1 from "../img/content/1cafe.PNG";
import image2 from "../img/content/2food.PNG";
import image3 from "../img/content/3notebook.PNG";
import image4 from "../img/content/4phone.PNG";
import image5 from "../img/content/5popsong.PNG";
import image6 from "../img/content/6stage.PNG";
import image7 from "../img/content/7dog.png";

// material import
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

///// css /////
//댓글 및 버튼 css
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 275,

    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  },
}));
//프로그래스 바 css
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

///// VotePage 전체 ////////////////////////////////////////////////////
/* 기본 params - url요청 : getVoted, getVotes, getFirst, getCommentRequest
              - store저장된 items : items, first, userId
   useParams  - nam(voteID)
   useState   - voted, comment, commented

*//////////////////////////////////////////////////////////////////////
function VotePage({
  getVoted,
  getVotes,
  getFirst,
  getCommentRequest,
  deleteComment,
  loading,
  items,
  first,
  userId,
}) {
  useEffect(() => {
    getFirst(nam, userId)
    getVotes(nam);
  }, []);

  //states
  const { nam } = useParams();
  const [voted, setVoted] = useState(false);
  const [comment, setComment] = useState("");
  const [commented, setCommented] = useState(false);
  let contName;
  let sid;
  let indexx = 0;
  //votePage관련 변수
  let voteID = [];
  let voteTitle = [];
  let voteRegDate = [];
  let voteHits = [];
  //contents 관련 변수
  let selecID = [];
  let selecContent = [];
  let selecHits = [];
  //댓글 변수
  let commentContent = [];
  let commentNickName = [];
  let commentID = [];
  let commentUserID = [];
  //console test
  let commentexam = "";
  console.log(items)
  /////// Data loading /////////////////////////////////////
  //items을 변수에 담는 과정
  //items를 바로 사용할 수 없는 현상때문에 옮겨 담음
  const voteItems = loading ? (
    <div>is loading...</div>
  ) : (
    items.map((item) => (
      <div key={item.voteID} style={{ visibility: "hidden" }}>
        {
          (selecContent.push(item.selecContent),
            selecID.push(item.selecID),
            selecHits.push(item.selecHits),
            voteID.push(item.voteID),
            voteTitle.push(item.voteTitle),
            voteRegDate.push(item.voteRegDate),
            voteHits.push(item.voteHits),
            commentContent.push(item.commentContent),
            commentNickName.push(item.nickName),
            commentID.push(item.commentID),
            commentUserID.push(item.userID))
        }
      </div>
    ))
  );
  /////// 데이터 처리 ///////////////////////////////
  //contents관련
  const selcContent = selecContent.filter((selecContent) => selecContent !== undefined);
  selcContent.shift();
  const selcHits = selecHits.filter((selecHits) => selecHits !== undefined);
  selcHits.shift();
  const selcId = selecID.filter((selecID) => selecID !== undefined);
  selcId.shift();
  //comment관련
  for (var i = 0; i < selcHits.length + 1; i++) {
    commentContent.shift();
    commentNickName.shift();
    commentID.shift();
    commentUserID.shift();
  }

  /////// 이미지 임시 저장 ////////////////////////////
  //이미지 저장과 호출이 가능하게 변경해야 함
  let images = new Image();

  if (nam == 1) {
    images = image1;
  } else if (nam == 2) {
    images = image2;
  } else if (nam == 3) {
    images = image3;
  } else if (nam == 4) {
    images = image4;
  } else if (nam == 5) {
    images = image5;
  } else if (nam == 6) {
    images = image6;
  } else if (nam == 7) {
    images = image7;
  } else {
    images = testImage;
  }

  ///// 이벤트 //////////////////////////////////////
  //contents 선택
  const handleCheck = ({ target }) => {
    indexx = target.name;
    sid = selcId[indexx];
  };
  //투표 버튼 클릭
  const handleSet = (e) => {
    getVoted(nam, sid, userId);
    setVoted(true);
  };
  //comment 어떤거 선택했는지
  const onChange = ({ target }) => {
    target.name = target.value;
    contName = target.value;
  };
  //comment 입력
  const handleChange = ({target}) => {
    target.name = target.value;
    setComment(commentexam);
  };
  //comment 버튼 클릭
  const handleRegister = (e) => {
    getCommentRequest(comment, nam, userId);
  };
  // 댓글 삭제 
  const handleDeleteComment = (data) => {
    deleteComment(nam, data);
    };

  /////// 화면 구성 /////////////////////////////////////////////////////////////////////////
  ///// votepage 상단 /////
  function VoteTop() {
    return (
      <div className="VotePage">
        <h1 className="title">{voteTitle}</h1>
        <h5 className="title">
          {voteRegDate[0]} | {voteHits}명
        </h5>
        <RBS.Col xs={6} md={4}>
          {/* ../public/content_img.png 이라고 해도 되지만 위치몰라도 고를 수 있는걸 보여주고 싶었음*/}
          <RBS.Image src={images} rounded />
        </RBS.Col>
      </div>
    );
  }

  ///// Contents /////
  //투표 안한사람 화면
  function contentList() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend"></FormLabel>
        <RadioGroup
          aria-label="select"
          name="select"
          onChange={(e) => onChange(e)}
        >
          {selcContent.map((item, index) => (
            <FormControlLabel
              name={index}
              value={item}
              control={<Radio />}
              onClick={(e) => handleCheck(e)}
              label={item}
            ></FormControlLabel>
          ))
          }
        </RadioGroup>
      </FormControl>
    );
  }

  function notVote() {
    return (
      <div>
        <RBS.Col>{contentList()}</RBS.Col>
        <RBS.Col>
          <Button
            variant="contained"
            color="primary"
            className={useStyles.submit}
            onClick={handleSet}
          >
            투표!
          </Button>
        </RBS.Col>
      </div>
    );
  }

  //투표 한사람 화면

  function yesContentList() {
    let P = [];
    let sum = 0;
    for (let i = 0; i < selcHits.length; i++) {
      sum += selcHits[i];
    }
    for (let i = 0; i < selcHits.length; i++) {
      P.push((selcHits[i] / sum) * 100);
      P[i] = P[i].toFixed(1);
    }

    return (
      <div>
        {selcHits.map((item, index) => (
          <div key={index} style={{ display: "block" }}>
            <>
              {selcContent[index] +
                " (" +
                selcHits[index] +
                "명) " +
                P[index] +
                "%"}
            </>
            <BorderLinearProgress variant="determinate" value={P[index]} />
          </div>
        ))}
      </div>
    );
  }

  function yesVote() {
    return (
      <div>
        <RBS.Col>{yesContentList()}</RBS.Col>
      </div>
    );
  }

  //투표 화면 최종본
  function Votefinal() {
    if (first == 1 || voted) {
      return (
        <div>
          {yesVote()}
        </div>
      )
    }
    else {
      return (
        <div>
          {notVote()}
        </div>
      )
    }
  }
  ///// Comment /////
  function InputComment() {
    return (
      <div>
        <form className={useStyles.root}>
          <TextField
            id="standard-full-width"
            name="commentexam"
            label="userId"
            style={{ margin: 8 }}
            placeholder="댓글을 입력하세요."
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            autofocus
            value={comment}
            onChange={(e) => handleChange(e)}
          />
          <Button
            variant="contained"
            color="primary"
            className={useStyles.submit}
            onClick={handleRegister}
          >
            등록하기
          </Button>
        </form>
      </div>
    )
  }
  function getComment() {
    return (
      <Grid container spacing={1}>
        {commentID.map((item, index) => (
          <div key={index}>
            {item}
            <CommentCard
              commentNickName={commentNickName[index]}
              commentContent={commentContent[index]}
              commentID={commentID[index]}
              userId={userId}
              commentUserID={commentUserID[index]}
              deleteComment={handleDeleteComment} />
          </div>
        ))}
      </Grid>
    );
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="VotePage">

      <RBS.Container>
        <RBS.Row>
          <RBS.Col>
            <VoteTop></VoteTop>
            <Votefinal></Votefinal>
            <InputComment></InputComment>
            <div>{commented ? getComment() : getComment()}</div>{/* 삼항연산없이 getComment써도 그냥 뜰거 같은데 확인해보자 */}
          </RBS.Col>
          <RBS.Col>
            <></>
          </RBS.Col>
        </RBS.Row>
      </RBS.Container>

      <div class="votes">{voteItems}</div> {/* 이부분이 없을때 어떻게 되는지 확인필요 */}

    </div >
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userId: state.authentication.status.currentUser,
    items: state.votes.get.items,
    first: state.votes.get.first,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVotes: (nam) => {
      return dispatch(getVotes(nam));
    },
    getVoted: (nam, sid, userId) => {
      return dispatch(getVoted(nam, sid, userId));
    },
    getCommentRequest: (comment, nam, userId) => {
      return dispatch(getCommentRequest(comment, nam, userId));
    },
    getFirst: (nam, userId) => {
      return dispatch(getFirst(nam, userId));
    },
    deleteComment: (nam, data) => {
      return dispatch(deleteComment(nam, data))
    }
  };  
};
export default connect(mapStateToProps, mapDispatchToProps)(VotePage);