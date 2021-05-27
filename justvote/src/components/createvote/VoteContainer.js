import React, { Component } from "react";
import CreateVote from "./CreateVote";
import { connect } from "react-redux";
import { votePostRequest } from "../../redux/makevote/actions";

class VoteContainer extends Component {
  handlePost = (voteTitle, voteContents) => {
    return this.props.votePostRequest(voteTitle, voteContents).then(() => {
      if (this.props.postStatus.status === "SUCCESS") {
        console.log("sR");
      }
    });
  };

  render() {
    return (
      <div>
        <CreateVote onPost={this.handlePost} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    postStatus: state.vote.post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    votePostRequest: (voteTitle, voteContents) => {
      return dispatch(votePostRequest(voteTitle, voteContents));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VoteContainer);
