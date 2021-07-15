import React, { useEffect, useState } from "react";
import * as RBS from "react-bootstrap";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getMainRequest, pushLikeBtRequest } from "../../redux";
import Subbar from "../Subbar";
import MediaCard from "../MediaCard";

// material import
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function MainHome({ getMainRequest, contentList, userID, loading }) {
  let voteHits = [];
  let voteID = [];
  let voteRegDate = [];
  let voteTitle = [];
  let isLikeContent = []; // 0이면 notLike, 1이면 Like
  let count = 0;

  useEffect(() => {
    getMainRequest(category, userID);
  }, []);

  const { category } = useParams();

  //데이터 받기
  const contentItems = loading ? (
    <div>is loading...</div>
  ) : (
    contentList.map((content) => (
      <div key={content.voteID} style={{ visibility: "hidden" }}>
        {
          (voteHits.push(content.voteHits),
          voteID.push(content.voteID),
          voteRegDate.push(content.voteRegDate),
          voteTitle.push(content.voteTitle),
          isLikeContent.push(content.isLikeContent))
        }
      </div>
    ))
  );

  // Like 버튼을 눌렀을 때
  function handlePushLikeBt(body) {
    pushLikeBtRequest(body).then();
  }

  //Contents에 관한 부분
  return (
    <div className={useStyles.root}>
      <Subbar></Subbar>
      <Grid container spacing={2}>
        {contentList.map((content, index) => (
          <Grid item xs={6} sm={3}>
            <Link key={index} to={`/content/${voteID[index]}`}>
              <MediaCard
                voteID={content.voteID}
                voteHits={content.voteHits}
                userID={userID}
                voteRegDate={content.voteRegDate}
                voteTitle={content.voteTitle}
                count={count++}
                isLikeContent={content.isLikeContent}
              ></MediaCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userID: state.authentication.status.currentUser,
    contentList: state.contents.status.voteContents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMainRequest: (category, userID) => {
      return dispatch(getMainRequest(category, userID));
    },
    pushLikeBtRequest: (body) => {
      return dispatch(pushLikeBtRequest(body));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainHome);
