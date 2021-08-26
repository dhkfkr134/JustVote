import React, { Component } from "react";
// import { connect } from "react-redux";
import propTypes from "prop-types";
import "./createvote.css";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

// import axios from 'axios';

// import { CreateVotes } from '../redux/makevote/actions';
import { makeStyles } from "@material-ui/core/styles";
import MyDropzone from "./MyDropzone";
import axios from "axios";

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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selectedFile : null,
  //   }
  // }
  state = {
    selectedFile: null,
    voteTitle: "",
    voteContents: [""],
    category: "",
  };

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
  selectChange = (e) => {
    this.setState({ category: e.target.value});
  }
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
      category: this.state.category,
    };

    console.log(body);

    this.props.onPost(body).then(() => {
      // 보내지면 빈칸으로 변경
      this.setState({
        voteTitle: "",
        voteContents: [""],
        category: "",
      });
    });
    // this.props.CreateVotes(this.state);
  };

  // handleFileInput(e){
  //   this.setState({
  //     selectedFile: e.target.files[0],
  //   })
  // }

  // handlePostImg() {
  //   const formData = new FormData();
  //   formData.append('file', this.state.selectedFile);
  //   console.log(formData[0]);
  //   console.log(this.state.selectedFile);
  //   const config = {
  //     headers: {
  //       'content-type' : 'multipart/form-data'
  //     }
  //   }
  //   return axios
  //   .post("http://localhost:8080/test", formData, config)
  //   .then(response => {
  //     console.log(response.data);
  //   }).catch(err => {
  //     console.log('안나와 씌이벌~');
  //   })
  // }
  // submitImg = (e) => {
  //   e.preventDefault();

  //   console.log(FileReader);
  // };

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
          <div className="category">
            <FormControl
                    fullWidth
                    variant="outlined"
            >
              <InputLabel id="grade">Category</InputLabel>
                <Select
                  labelId="grade"
                  id="grade"
                  value={this.state.select}
                  onChange={this.selectChange}
                  label="Grade"
                >
                  <MenuItem value="연예">연예</MenuItem>
                  <MenuItem value="시사">시사</MenuItem>
                  <MenuItem value="TV">TV</MenuItem>
                  <MenuItem value="학교">학교</MenuItem>
                  <MenuItem value="썰">썰</MenuItem>
                  <MenuItem value="기타">기타</MenuItem>
                </Select>
              </FormControl>
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
          {/* <div>
            <input type="file" name="file" onChange={e => this.handleFileInput(e)}/>
            <button type="button" onClick={this.handlePostImg()}/>
          </div> */}
          <div className="subcontainer">
            <button className="button" onClick={this.handleSubmit}>
              투표 만들기
            </button>
            <MyDropzone/>
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