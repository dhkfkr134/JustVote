import React, { Component } from "react";
import CreateVote from "./CreateVote";
import { connect } from "react-redux";
import { votePostRequest } from "../../redux/makevote/actions";

class VoteContainer extends Component {
  handlePost = (body) => {
    return this.props.votePostRequest(body).then(() => {
      if (this.props.postStatus.status === "SUCCESS") {
        console.log("sR");

        this.props.history.push("/");
        return true;
      } else {
        return false;
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
    // currentUser: state.authemtication.status.currentUser,
    // isLoggedIn: state.authemtication.status.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    votePostRequest: (body) => {
      return dispatch(votePostRequest(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VoteContainer);
