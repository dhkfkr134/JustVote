import React, { useEffect, useState } from "react";
import * as RBS from "react-bootstrap";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getVotes, registerCommentRequest } from "../redux";
import testImage from "../img/content_img.png";

// material import
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function VotePage({
  getVotes,
  loading,
  items,
  userId,
  registerCommentRequest,
}) {
  useEffect(() => {
    getVotes();
  }, []);

  const [gender, setGender] = useState();

  const onChange = ({ target }) => {
    setGender(gender);
    target.name = target.value;
  };

  const voteItems = loading ? (
    <div>is loading...</div>
  ) : (
    // items.map(vote => (
    <div key={items.id}>
      <h3>{items.name}</h3>
      <p>{items.email}</p>
      <p>{items.body}</p>
    </div>
    // ))
  );

  //투표객체
  class Test {
    constructor(name, date, voter, content, chosen) {
      this.name = name;
      this.date = date;
      this.voter = voter;
      this.content = content;
      this.chosen = chosen;
    }
  }
  //투표객체 생성
  let test = new Test(
    "제목",
    "날짜",
    "1500",
    ["추억과 김밥", "밀알 식당", "논두렁 갈비"],
    [300, 500, 700]
  );
  //파라미터
  const { nam } = useParams();

  //투표화면 상단
  function VoteTop() {
    return (
      <div className="VotePage">
        <h1 className="title">
          {test.name}
          {nam}
        </h1>
        <h5 className="title">
          {test.date} | {test.voter}명
        </h5>
        <RBS.Col xs={6} md={4}>
          {/* ../public/content_img.png 이라고 해도 되지만 위치몰라도 고를 수 있는걸 보여주고 싶었음*/}
          <RBS.Image src={testImage} rounded />
        </RBS.Col>
      </div>
    );
  }
  //Contents에 관한 부분
  function contentList() {
    var P = [];
    for (var i = 0; i < test.content.length; i++) {
      P.push((test.chosen[i] / test.voter) * 100);
      P[i] = P[i].toFixed(2);
    }
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={gender}
          onChange={(e) => onChange(e)}
        >
          {test.content.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item}
              control={<Radio />}
              label={item}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }

  // 댓글 등록
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleRegister = (e) => {
    let body = {
      userId: userId,
      comment: comment,
      //contentTitle: contentTitle,
    };

    console.log(body);
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
      {contentList()}
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
      <div class="votes">{voteItems}</div>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    userId: state.authentication.status.currentUser,
    items: state.votes.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVotes: () => {
      return dispatch(getVotes());
    },
    registerCommentRequest: (body) => {
      return dispatch(registerCommentRequest(body));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VotePage);
