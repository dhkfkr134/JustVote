import React, { Component } from "react";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class Authentication extends Component {
  state = {
    userId: "",
    userPass: "",
  };

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  /*
    handleRegister = () => {
        let id = this.state.userId;
        let pw = this.state.userPass;

        this.props.onRegister(id, pw).then(
            (result) => {
                if(!result) {
                    this.setState({
                        userId: '',
                        userPass: ''
                    });
                }
            }
        );
    }
    */

  handleLogin = () => {
    let id = this.state.userId;
    let pw = this.state.userPass;

    this.props.onLogin(id, pw).then((success) => {
      // 실패하면 비밀번호 재입력 받음
      if (!success) {
        this.setState({
          userPass: "",
        });
      }
    });
  };

  render() {
    const inputBoxes = (
      <div>
        <div className="input-field col s12 userId">
          <label>userId</label>
          <input
            name="userId"
            type="text"
            className="validate"
            onChange={this.handleChange}
            value={this.state.userId}
          />
        </div>
        <div className="input-field col s12">
          <label>userPass</label>
          <input
            name="userPass"
            type="userPass"
            className="validate"
            onChange={this.handleChange}
            value={this.state.userPass}
          />
        </div>
      </div>
    );

    const loginView = (
      <div>
        <div className="card-content">
          <div className="row">
            {inputBoxes}
            <a
              className="waves-effect waves-light btn"
              onClick={this.handleLogin}
            >
              SUBMIT
            </a>
          </div>
        </div>

        <div className="footer">
          <div className="card-content">
            <div className="right">
              New Here? <Link to="/SignUp">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container auth">
        <Link className="logo" to="/">
          JustVote
        </Link>
        <div className="card">
          <div className="header blue white-text center">
            <div className="card-content">{"LOGIN"}</div>
          </div>
          {loginView}
        </div>
      </div>
    );
  }
}

Authentication.propTypes = {
  onLogin: PropTypes.func,
};

Authentication.defaultProps = {
  onLogin: (id, pw) => {
    console.error("login function not defined");
  },
};

export default Authentication;
