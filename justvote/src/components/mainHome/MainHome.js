import React, { useEffect, useState } from "react";
import * as RBS from "react-bootstrap";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getMainRequest } from "../../redux";
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

function MainHome({ getMainRequest, contentList ,userId, loading }) {

  let voteHits = [];
  let voteID = [];
  let voteRegDate = [];
  let voteTitle = [];

  let count = 0;
  useEffect(() => {
    getMainRequest();
  }, []);

  console.log(contentList)

  //데이터 받기
  const contentItems = loading? (
     <div>is loading...</div>
     ): ( contentList.map((content) => (
    <div key={content.voteID} style={{ visibility: "hidden" }}>
      {
        (voteHits.push(content.voteHits),
        voteID.push(content.voteID),
        voteRegDate.push(content.voteRegDate),
        voteTitle.push(content.voteTitle))
      }
    </div>
  )));
  console.log(voteTitle)

  //Contents에 관한 부분
  return (
    <div className={useStyles.root}>
      <Subbar></Subbar>
      <Grid container spacing={2}>
        {contentList.map((content, index) => (
          <Grid item xs={6} sm={3}>
            <Link key={index} to={`/content/${index + 1}`}>
              <MediaCard
                voteHits={content.voteHits}
                userID={content.userID}
                voteRegDate={content.voteRegDate}
                voteTitle={content.voteTitle}
                count={count++}
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
    userId: state.authentication.status.currentUser,
    contentList: state.contents.status.voteContents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMainRequest: () => {
      return dispatch(getMainRequest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainHome);
