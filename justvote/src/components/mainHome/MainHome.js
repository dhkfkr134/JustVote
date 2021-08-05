import React, { useEffect, useState } from "react";
import * as RBS from "react-bootstrap";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  getMainRequest,
  pushLikeBtRequest,
  pushDislikeBtRequest,
  getLikeRequest,
} from "../../redux";
import Subbar from "../Subbar";
import MediaCard from "./MediaCard";

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

function MainHome({
  getMainRequest,
  getLikeRequest,
  pushLikeBtRequest,
  pushDislikeBtRequest,
  contentList,
  checkGetMain,
  userID,
  loading,
  likeBtState,
  dislikeBtState,
  getLike,
  history,
}) {
  let voteHits = [];
  let voteID = [];
  let voteRegDate = [];
  let voteTitle = [];
  let isLikeContent = []; // 0이면 notLike, 1이면 Like
  let makerID = [];
  let count = 0;
  let like = [];

  useEffect(() => {
    getLikeRequest(category);
    getMainRequest(category);
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
          makerID.push(content.userID),
          like.push(content.like))
        }
      </div>
    ))
  );

  console.log(userID);
  // 데이터 받기
  const getLikeItems = loading ? (
    <div>is loading...</div>
  ) : (
    getLike.map((content) => (
      <div key={content.voteID} style={{ visibility: "hidden" }}>
        {isLikeContent.push(content.tf)}
      </div>
    ))
  );

  // Like 버튼을 눌렀을 때
  function handlePushLikeBt(body) {
    pushLikeBtRequest(body).then(() => {
      window.location.replace("/Home/" + category);
    });
  }

  // Like 취소 버튼 눌렀을 때
  function handlePushDislikeBt(body) {
    pushDislikeBtRequest(body).then(() => {
      window.location.replace("/Home/" + category);
    });
  }

  //Contents에 관한 부분
  return (
    <div className={useStyles.root}>
      <Subbar></Subbar>
      <Grid container spacing={2}>
        {contentList.map((content, index) => (
          <Grid item xs={6} sm={3}>
            <MediaCard
              voteID={content.voteID}
              voteHits={content.voteHits}
              userID={userID}
              voteRegDate={content.voteRegDate}
              voteTitle={content.voteTitle}
              count={count++}
              isLikeContent={isLikeContent[index]}
              makerID={content.userID}
              like={content.like}
              handlePushLikeBt={handlePushLikeBt}
              handlePushDislikeBt={handlePushDislikeBt}
            ></MediaCard>
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
    checkGetMain: state.contents.status.valid,
    getLike: state.contents.getLikeStatus.isLikeContents,
    likeBtState: state.contents.addLike.status,
    dislikeBtState: state.contents.disLike.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMainRequest: (category) => {
      return dispatch(getMainRequest(category));
    },
    getLikeRequest: (category) => {
      return dispatch(getLikeRequest(category));
    },
    pushLikeBtRequest: (body) => {
      return dispatch(pushLikeBtRequest(body));
    },
    pushDislikeBtRequest: (body) => {
      return dispatch(pushDislikeBtRequest(body));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainHome);
