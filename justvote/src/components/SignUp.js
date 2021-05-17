/* 회원가입 */

import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class SignUp extends Component{

  constructor(props){
    super(props);

    this.state = {
      username: '',
      sex: '',
      age: '',
      major: '',
      grade: '',
      nickName: '',
      userId: '',
      userPass: '',
      message: null
    }

  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  saveUser = (e) => {
    e.preventDefault();

    let user = {
      username: this.state.username,
      sex: this.state.sex,
      age: this.state.age,
      major: this.state.major,
      grade: this.state.grade,
      nickName: this.state.nickName,
      userId: this.state.userId,
      userPass: this.state.userPass,
    }

    console.log(user)

    axios
      .post("http://localhost:8080/register", {user})
      .then((res) => console.log(res))
      .catch(err => {
        console.log('에러', err);
      });
  }


  render(){
    return(

    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={useStyles.paper}>
          <Avatar className={useStyles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={useStyles.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={this.onChange}
                  value={this.state.username}
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
                  <RadioGroup aria-label="gender" name="sex" value={this.state.sex} onChange={this.onChange}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
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
                <TextField
                  autoComplete="major"
                  name="major"
                  variant="outlined"
                  required
                  fullWidth
                  id="major"
                  label="Major"
                  autoFocus
                  onChange={this.onChange}
                  value={this.state.major}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="grade"
                    label="Grade"
                    type="grade"
                    id="grade"
                    autoComplete="grade"
                    onChange={this.onChange}
                    value={this.state.grade}
                />
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
                <Link href="#" variant="body2">
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
