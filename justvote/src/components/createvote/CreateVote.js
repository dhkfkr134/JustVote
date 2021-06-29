import React, { Component } from "react";
// import { connect } from "react-redux";
import propTypes from "prop-types";
import "./createvote.css";

// import axios from 'axios';

// import { CreateVotes } from '../redux/makevote/actions';
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
    voteTitle: "",
    voteContents: [""],
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
      voteTitle: this.state.voteTitle,
      selecContentList: this.state.voteContents,
    };

    console.log(body);

    this.props.onPost(body).then(() => {
      // 보내지면 빈칸으로 변경
      this.setState({
        voteTitle: "",
        voteContents: [""],
      });
    });
    // this.props.CreateVotes(this.state);
  };

  submitImg = (e) => {
    e.preventDefault();

    console.log(FileReader);
  };

  render() {
    const voteContents = this.state.voteContents.map((content, i) => (
      <div key={i} className="vconContainer">
        <input
          className="content"
          type="text"
          value={content}
          key={i}
          onChange={(e) => this.handleAnswer(e, i)}
        />
        <div className="button-container">
          <button
            className="remove-button"
            onClick={(e) => this.removeAnswer(i)}
          >
            삭제
          </button>
          {/* <Button
            className="remove-button"
            type="button"
            variant="contained"
            color="secondary"
            size="medium"
            onClick={(e) => this.removeAnswer(i)}
          >
            삭제
          </Button> */}
        </div>
      </div>
    ));

    return (
      <div className="container">
        <div className="form">
          <h3 className="header">투표 만들기</h3>
          <div className="title-holder">
            <label className="title-name" htmlFor="voteTitle">
              투표 제목
            </label>
            <input
              className="title"
              type="text"
              name="voteTitle"
              value={this.state.voteTitle}
              onChange={this.handleChange}
            />
          </div>

          <div className="conContainer">
            <label className="conName">투표 항목</label>
            {voteContents}
          </div>
          <div className="addcontainer">
            <button className="button" onClick={this.addAnswer}>
              항목 추가
            </button>
          </div>
          <div className="subcontainer">
            <button className="button" onClick={this.handleSubmit}>
              투표 만들기
            </button>
            <MyDropzone />
          </div>
        </div>
      </div>
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