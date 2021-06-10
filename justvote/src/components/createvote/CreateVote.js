import React, { Component, Fragment } from "react";
// import { connect } from "react-redux";
import propTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./createvote.css";

// 이미지 전송
import { makeStyles } from "@material-ui/core/styles";
import MyDropzone from "./MyDropzone";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

class CreateVote extends Component {
  state = {
    userId: "",
    voteTitle: "",
    voteContents: [""],
    Images: [],
    // 이미지
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
    let body = {
      voteId: this.state.voteId,
      voteTitle: this.state.voteTitle,
      voteContent: this.state.voteContents,
    };

    console.log(body);

    this.props.onPost(body).then(() => {
      // 보내지면 빈칸으로 변경
      this.setState({
        userId: "",
        voteTitle: "",
        voteContents: [""],
      });
    });
    // this.props.CreateVotes(this.state);
  };

  // 이미지 전송

  submitImg = (e) => {
    e.preventDefault();

    console.log(FileReader);
  };

  render() {
    const voteContents = this.state.voteContents.map((content, i) => (
      <Fragment key={i}>
        <label className="form-label"></label>
        <TextField
          id="outlined-basic"
          label="항목"
          variant="outlined"
          className="content"
          type="text"
          value={content}
          key={i}
          onChange={(e) => this.handleAnswer(e, i)}
        />
        <div className="button-container">
          <Button
            className="remove-button"
            type="button"
            variant="contained"
            color="secondary"
            size="medium"
            onClick={(e) => this.removeAnswer(i)}
          >
            삭제
          </Button>
        </div>
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
          value={this.state.voteTitle}
          onChange={this.handleChange}
        />
        <div className="conContainer">{voteContents}</div>
        <div className="buttons_center">
          <Button
            className="button"
            type="button"
            variant="contained"
            color="primary"
            size="medium"
            onClick={this.addAnswer}
          >
            항목 추가
          </Button>
          <Button className="button" type="submit" onClick={this.handleSubmit}>
            투표 만들기
          </Button>
        </div>
        <div>
          <MyDropzone />
        </div>
      </form>
    );
  }
}

CreateVote.propTypes = {
  onPost: propTypes.func,
};

CreateVote.defaultProps = {
  onPost: (body) => {
    console.error("post function not defined");
  },
};

export default CreateVote;
// export default connect(() => ({}), { CreateVotes })(CreateVote);
