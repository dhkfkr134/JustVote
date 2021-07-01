import React, { useEffect, useState } from "react";
import * as RBS from "react-bootstrap";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getVotes, registerCommentRequest, setVotesRequest } from "../redux";
import testImage from "../img/content_img.png";

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
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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

function VotePage({
  getVotes,
  loading,
  items,
  userId,
  registerCommentRequest,
}) {
  useEffect(() => {
    getVotes(nam);
  }, []);

  const [select, setSelect] = useState();
  const [voted, setVoted] = useState(false);
  let contName;

  const { nam } = useParams();

  const onChange = ({ target }) => {
    setSelect(select);
    target.name = target.value;
    contName = target.value;
  };
  console.log(items[0]);
  // let items_2 = JSON.stringify(items)
  // console.log(items_2)
  // let items_3 = JSON.parse(items_2)
  // console.log(items_3)

  let voteID = [];
  let voteTitle = [];
  let voteRegDate = [];
  let voteHits = [];
  let selecID = [];
  let selecContent = [];
  let selecHits = [];

  //댓글 변수들
  let commentContent = [];
  let commentID = [];
  let commentUserID = [];

  //데이터 받기
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
          commentID.push(item.commentID),
          commentUserID.push(item.userId))
        }
      </div>
    ))
  );

  const selcContent = selecContent.filter(
    (selecContent) => selecContent !== undefined
  );
  const selcHits = selecHits.filter((selecHits) => selecHits !== undefined);
  console.log(selcContent);
  selcHits.shift();

  console.log();
  for (var i = 0; i < selcHits.length + 1; i++) {
    commentContent.shift();
    commentID.shift();
    commentUserID.shift();
  }
  console.log(commentID);

  //파라미터

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
  console.log(images);

  const selectContent = selcContent.shift();
  // 투표화면 상단
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
  let indexx = 0;
  const handleCheck = (e) => {
    console.log(e.target.key);
    indexx = e.target.key;
  };
  //Contents에 관한 부분
  function contentList() {
    let P = [];
    // for (let i = 1; i < selecContent.length; i++) {
    //   P.push((selecHits[i] / voteHits[0]) * 100);
    //   P[i] = P[i].toFixed(2);
    // }
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend"></FormLabel>
        <RadioGroup
          aria-label="select"
          name="select"
          value={select}
          onChange={(e) => onChange(e)}
        >
          {selcContent.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item}
              control={<Radio />}
              //             onClick={() => handleCheck()}
              label={item}
            ></FormControlLabel>
          ))}
        </RadioGroup>
      </FormControl>
    );
  }

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
    console.log(selecHits);
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

  //투표 안한사람 화면
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
  function yesVote() {
    return (
      <div>
        <RBS.Col>{yesContentList()}</RBS.Col>
      </div>
    );
  }

  // 댓글 등록
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleRegister = (e) => {
    let body = {
      userID: userId,
      commentContent: comment,
      voteID: voteID[0],
    };

    registerCommentRequest(body).then(() => {
      // push해줌
    });
    // comment 등록하면 빈칸으로
  };

  // 댓글 삭제
  const handelDeleteComment = (e) => {
    let body = {
      userId: userId,
      //댓글 번호?
      //contentTitle: contentTitle,
    };
  };

  const handleSet = (e) => {
    let body = {
      voteID: voteID[0],
      selecContent: contName,
      userID: userId,
    };

    setVotesRequest(body);
    setVoted(true);
  };

  // 댓글 가져오기
  function getComment() {
    return (
      <Grid container spacing={1}>
        {commentID.map((item, index) => (
          <Card className={useStyles.root}>
            <CardContent>
              <Typography
                className={useStyles.title}
                color="textSecondary"
                gutterBottom
              >
                {commentUserID[index]}
              </Typography>
              <Typography variant="body2" component="p">
                {commentContent[index]}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Delete</Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    );
  }

  return (
    <div className="VotePage">
      <RBS.Container>
        <RBS.Row>
          <RBS.Col>
            <VoteTop></VoteTop>
          </RBS.Col>
          <RBS.Col></RBS.Col>
        </RBS.Row>
      </RBS.Container>
      {voted ? yesVote() : notVote()}

      <div>
        <form className={useStyles.root}>
          <TextField
            id="standard-full-width"
            label="userId"
            style={{ margin: 8 }}
            placeholder="댓글을 입력하세요."
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
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
      <div>{getComment()}</div>
      <div class="votes">{voteItems}</div>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    userId: state.authentication.status.currentUser,
    items: state.votes.get.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVotes: (nam) => {
      return dispatch(getVotes(nam));
    },
    registerCommentRequest: (body) => {
      return dispatch(registerCommentRequest(body));
    },
    setVotesRequest: (body) => {
      return dispatch(setVotesRequest(body));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VotePage);
