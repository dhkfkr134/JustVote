import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [userId, setUserId] = React.useState(" ")
  const [userPass, setUserPass] = React.useState(" ")

  const onUserIdHandler = (event) => {
      setUserId(event.currentTarget.value)
  }

  const onUserPassHandler = (event) => {
      setUserPass(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
      event.preventDefault(); //리프레시 방지-> 방지해야 이 아래 라인의 코드들 실행 가능 

      // console.log('userId', userId);
      // console.log('userPass', userPass);


      let body={
          userId: userId,
          userPass: userPass
      }

      //디스패치로 액션 취하기
      dispatch(loginUser(body))
      .then(response => {
          if(response.payload.loginSuccess) {
              props.history.push('/')
          //리액트에서 페이지 이동하기 위해서는 props.history.push() 이용.
          // 로그인 완료된 후 처음 화면(루트 페이지-landingpage로)으로 돌악가게 하기 
          } else{
              alert(' Error')
          }
      })
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userId"
            label="UserId"
            name="userId"
            autoComplete="userId"
            autoFocus
            onChange={onUserIdHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="userPass"
            label="UserPass"
            type="userPass"
            id="userPass"
            autoComplete="current-password"
            onChange={onUserPassHandler}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onSubmit={onSubmitHandler}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}