import React, { Component } from "react";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  handleLogin = () => {
    let id = this.state.userId;
    let pw = this.state.userPass;

    // 정보가 부족하면 오류 메시지 출력
    if (this.state.userId === "") {
      this.toastCheckInfo_NotInfoID();
      return false;
    } else if (this.state.userPass === "") {
      this.toastCheckInfo_NotInfoPassword();
      return false;
    }

    this.props.onLogin(id, pw).then((success) => {
      // 실패하면 비밀번호 재입력 받음
      console.log("Auth_handleLogin");
      if (!success) {
        console.log(this.props);
        this.toastCheckInfo_Fail();
        this.setState({
          userPass: "",
        });
      } else {
        this.toastCheckInfo_Complete();
      }
    });
  };

  toastCheckInfo_Complete = () => toast(this.state.userId + "님 반갑습니다.");
  toastCheckInfo_NotInfoID = () => toast.error("아이디를 입력해주세요.");
  toastCheckInfo_NotInfoPassword = () =>
    toast.error("비밀번호를 입력해주세요.");
  toastCheckInfo_Fail = () =>
    toast.error("아이디 또는 패스워드가 잘못 입력되었습니다.");

  render() {
    const button = {};

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={useStyles.paper}>
          <Avatar className={useStyles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <form className={useStyles.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userId"
              label="ID"
              name="userId"
              autoComplete="userId"
              autoFocus
              value={this.state.userId}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="userPass"
              label="PASSWORD"
              type="Password"
              id="userPass"
              autoComplete="current-password"
              onChange={this.handleChange}
              value={this.state.userPass}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={useStyles.submit}
              onClick={this.handleLogin}
            >
              로그인
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"계정이 없다면? 회원가입하러 가기"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <div>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Flip}
          />
        </div>
      </Container>
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
