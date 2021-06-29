/* 회원가입 */

import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import axios from "axios";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      gender: "",
      age: "",
      major: "",
      grade: "",
      nickName: "",
      userId: "",
      userPass: "",
      message: null,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeMajor = (e) => {
    this.setState({ major: e.target.value });
  };

  onChangeGrade = (e) => {
    this.setState({ grade: e.target.value });
  };

  saveUser = (e) => {
    e.preventDefault();

    let body = {
      userName: this.state.userName,
      sex: this.state.gender,
      age: this.state.age,
      major: this.state.major,
      grade: this.state.grade,
      nickName: this.state.nickName,
      userID: this.state.userId,
      userPass: this.state.userPass,
    };

    console.log(body);

    axios
      .post("http://localhost:8080/register", body)
      .then((res) => {
        console.log(res)
        this.props.history.push("/")
      })
      .catch((err) => {
        console.log("에러", err);
      });
  };

  render() {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={useStyles.paper}>
            <Avatar className={useStyles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              JUST VOTE
            </Typography>
            <Typography component="subtitle2" variant="subtitle2">
              궁금한 모든 것 투표해보세요
            </Typography>
            <form className={useStyles.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="userName"
                    name="userName"
                    variant="outlined"
                    required
                    fullWidth
                    id="userName"
                    label="userName"
                    autoFocus
                    onChange={this.onChange}
                    value={this.state.userName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="nickName"
                    name="nickName"
                    variant="outlined"
                    required
                    fullWidth
                    id="nickName"
                    label="NickName"
                    autoFocus
                    onChange={this.onChange}
                    value={this.state.nickName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="gender"
                      value={this.state.gender}
                      onChange={this.onChange}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="남"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="여"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="age"
                    name="age"
                    variant="outlined"
                    required
                    fullWidth
                    id="age"
                    label="Age"
                    autoFocus
                    onChange={this.onChange}
                    value={this.state.age}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={useStyles.formControl}
                  >
                    <InputLabel id="grade">Grade</InputLabel>
                    <Select
                      labelId="grade"
                      id="grade"
                      value={this.state.grade}
                      onChange={this.onChangeGrade}
                      label="Grade"
                    >
                      <MenuItem value="1">1학년</MenuItem>
                      <MenuItem value="2">2학년</MenuItem>
                      <MenuItem value="3">3학년</MenuItem>
                      <MenuItem value="4">4학년</MenuItem>
                      <MenuItem value="5">5학년</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={useStyles.formControl}
                  >
                    <InputLabel id="major">Major</InputLabel>
                    <Select
                      labelId="major"
                      id="major"
                      value={this.state.major}
                      onChange={this.onChangeMajor}
                      label="Major"
                    >
                      <MenuItem value="soft">소프트웨어학부</MenuItem>
                      <MenuItem value="compute">컴퓨터공학</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="userId"
                    label="ID"
                    type="userId"
                    id="userId"
                    autoComplete="userId"
                    onChange={this.onChange}
                    value={this.state.userId}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="userPass"
                    label="Password"
                    type="password"
                    id="userPass"
                    autoComplete="current-userPass"
                    onChange={this.onChange}
                    value={this.state.userPass}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={useStyles.submit}
                onClick={this.saveUser}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/SignIn" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

export default SignUp;
