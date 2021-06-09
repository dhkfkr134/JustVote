import React, { useEffect, useState } from "react";
import * as RBS from "react-bootstrap";
import { useParams } from "react-router-dom";

import { connect } from "react-redux";
import { getVotes, registercommentRequest } from "../redux";

import testImage from "../img/content_img.png";

// material import
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
  registercommentRequest,
}) {
  useEffect(() => {
    getVotes();
  }, []);
  //  console.log(items);

  const voteItems = loading ? (
    <div>is loading...</div>
  ) : (
    items.map((vote) => (
      <div key={vote.id}>
        <h3>{vote.name}</h3>
        <p>{vote.email}</p>
        <p>{vote.body}</p>
      </div>
    ))
  );

  class Test {
    constructor(name, date, voter, content) {
      this.name = name;
      this.date = date;
      this.voter = voter;
      this.content = content;
    }
  }
  let test = new Test("제목", "2021.05.11", 1500, [
    "추억과 김밥",
    "밀알 식당",
    "논두렁 갈비",
  ]);

  const { nam } = useParams();

  function VoteTop() {
    return (
      <div className="VotePage">
        <h1>
          {test.name}
          {nam}
        </h1>
        <h5>
          {test.date} | {test.voter}명
        </h5>
        <RBS.Col xs={6} md={4}>
          {/* ../public/content_img.png 이라고 해도 되지만 위치몰라도 고를 수 있는걸 보여주고 싶었음*/}
          <RBS.Image src={testImage} rounded />
        </RBS.Col>
      </div>
    );
  }

  function contentList() {
    return (
      <ul className="list_content">
        {test.content.map((item, index) => (
          <tr key={index}>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <div>
                Content{index + 1} {item}
              </div>
            </td>
          </tr>
        ))}
      </ul>
    );
  }

  // 댓글 등록
  const [comment, setcomment] = useState("");

  const handleChange = (e) => {
    setcomment(e.target.value);
  };

  const handleRegister = (e) => {
    let body = {
      userId: userId,
      comment: comment,
      //contentTitle: contentTitle,
    };

    console.log(body);
    registercommentRequest(body).then(() => {});
  };

  return (
    <div className="VotePage">
      <RBS.Container>
        <RBS.Row>
          <RBS.Col>
            <VoteTop></VoteTop>
          </RBS.Col>
          <RBS.Col>
            {/* <div style="position: absolute; right: 0px; bottom: 0px;">
                          안녕하세요!!!
                        </div> */}
          </RBS.Col>
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
    registercommentRequest: (body) => {
      return dispatch(registercommentRequest(body));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VotePage);
