import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
//import "../styles/makevote.css";
// import axios from 'axios';

// import { CreateVotes } from '../redux/makevote/actions';

class CreateVote extends Component {
  state = {
    voteTitle: "",
    voteContents: ["", ""],
  };

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    console.log(this.state);
  };

  addAnswer = (e) => {
    this.setState({ voteContents: [...this.state.voteContents, ""] });
  };

  removeAnswer = (index) => {
    const newContents = this.state.voteContents.filter((content, i) => {
      return i !== index;
    });

    this.setState({ voteContents: newContents });
  };

  handleAnswer = (e, index) => {
    const voteContents = [...this.state.voteContents];
    voteContents[index] = e.target.value;
    this.setState({ voteContents });
    console.log(this.state);
  };

  handleSubmit(e) {
    e.preventDefault();

    let body = {
      voteTitle: this.state.voteTitle,
      voteContents: this.state.voteContents,
    };

    this.props.onPost(body).then(() => {
      this.setState({
        voteTitle: "",
        voteContents: ["", ""],
      });
    });
    // this.props.CreateVotes(this.state);
  }

  render() {
    const voteContents = this.state.voteContents.map((content, i) => (
      <Fragment key={i}>
        <label className="form-label">항목</label>
        <input
          className="form-input"
          type="text"
          value={content}
          key={i}
          onChange={(e) => this.handleAnswer(e, i)}
        />
        <button className="button" type="button" onClick={this.removeAnswer(i)}>
          삭제
        </button>
      </Fragment>
    ));

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label className="form-label" htmlFor="voteTitle">
          투표 제목
        </label>
        <input
          className="form-input"
          type="text"
          name="voteTitle"
          value={this.state.question}
          onChange={this.handleChange}
        />
        <div className="container">{voteContents}</div>
        <div className="buttons_center">
          <button className="button" type="button" onClick={this.addAnswer}>
            항목 추가
          </button>
        </div>
        <button className="button" type="submit">
          투표 만들기
        </button>
      </form>
    );
  }
}

CreateVote.propTypes = {
  onPost: propTypes.func,
};

CreateVote.defaultProps = {
  onPost: (voteTitle, voteContents) => {
    console.error("post function not defined");
  },
};

export default CreateVote;
// export default connect(() => ({}), { CreateVotes })(CreateVote);
