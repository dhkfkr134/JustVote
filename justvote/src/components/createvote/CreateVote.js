import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// import axios from 'axios';

// import { CreateVotes } from '../redux/makevote/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

class CreateVote extends Component {
  state = {
    voteTitle: "",
    voteContents: ["", ""],
  };

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
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
  };

  handleSubmit = (e) => {
    e.preventDefault();

    console.log(this.state);
    let title = this.state.voteTitle;
    let contents = this.state.voteContents;

    this.props.onPost(title, contents).then(() => {
      this.setState({
        voteTitle: "",
        voteContents: ["", ""],
      });
    });
    // this.props.CreateVotes(this.state);
  };

  render() {
    const voteContents = this.state.voteContents.map((content, i) => (
      <Fragment key={i}>
        <label className="form-label"></label>
        <TextField
          id="outlined-basic"
          label="항목"
          variant="outlined"
          className="form-input"
          type="text"
          value={content}
          key={i}
          onChange={(e) => this.handleAnswer(e, i)}
        />
        <button
          className="button"
          type="button"
          onClick={(e) => this.removeAnswer(i)}
        >
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
        <button className="button" type="submit" onClick={this.handleSubmit}>
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
