import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import "./ranking.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";

import icon1 from "../../img/icon/1.png";
import icon2 from "../../img/icon/2.png";
import icon3 from "../../img/icon/3.png";
import icon4 from "../../img/icon/4.png";
import icon5 from "../../img/icon/5.png";
import icon6 from "../../img/icon/6.png";
import icon7 from "../../img/icon/7.png";
import icon8 from "../../img/icon/8.png";
import icon9 from "../../img/icon/9.png";
import icon10 from "../../img/icon/10.PNG";

const columns = [
  { id: "rank", label: "Rank", minWidth: 100 },
  { id: "title", label: "Title", minWidth: 170 },

  {
    id: "user",
    label: "user",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "hit",
    label: "hit",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(rank, title, user, hit) {
  return { rank, title, user, hit };
}

const rows = [
  createData(1, "투표1", "김시우", 123),
  createData(2, "투표2", "조소망", 121),
  createData(3, "투표3", "박철순", 120),
  createData(4, "투표 4", "김정원", 114),
  createData(5, "투표 5", "이상민", 110),
  createData(6, "투표 6", "이우진", 106),
  createData(7, "투표 7", "계대환", 104),
  createData(8, "투표 8", "윤준서", 100),
  createData(9, ""),
  createData(10, ""),
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    height: "50%",
    display: "flex",
    padding: "20px, 20px, 20px, 20px",
    margin: "5px",
  },
  container: {
    maxHeight: 700,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    margin: "0px 20px 0px 20px",
    width: 80,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={useStyles.paper}>
          <Typography component="h1" variant="h5">
            JUST VOTE
          </Typography>

          <form className={useStyles.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card className={classes.root}>
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography component="h5" variant="h5">
                        TOP 1
                      </Typography>
                      <Typography variant="subtitle1">whthakd</Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        point : 244
                      </Typography>
                    </CardContent>
                  </div>
                  <CardMedia
                    className={classes.cover}
                    image={icon3}
                    title="Live from space album cover"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card className={classes.root}>
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography component="h5" variant="h5">
                        TOP 2
                      </Typography>
                      <Typography variant="subtitle1">Siwoo</Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        point : 232
                      </Typography>
                    </CardContent>
                  </div>
                  <CardMedia
                    className={classes.cover}
                    image={icon10}
                    title="Live from space album cover"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card className={classes.root}>
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography component="h5" variant="h5">
                        TOP 3
                      </Typography>
                      <Typography variant="subtitle1">yanolza</Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        point : 226
                      </Typography>
                    </CardContent>
                  </div>
                  <CardMedia
                    className={classes.cover}
                    image={icon1}
                    title="Live from space album cover"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card className={classes.root}>
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography component="h5" variant="h5">
                        TOP 4
                      </Typography>
                      <Typography variant="subtitle1">firebird</Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        point : 208
                      </Typography>
                    </CardContent>
                  </div>
                  <CardMedia
                    className={classes.cover}
                    image={icon4}
                    title="Live from space album cover"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card className={classes.root}>
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography component="h5" variant="h5">
                        TOP 5
                      </Typography>
                      <Typography variant="subtitle1">kingWoo</Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        point : 199
                      </Typography>
                    </CardContent>
                  </div>
                  <CardMedia
                    className={classes.cover}
                    image={icon7}
                    title="Live from space album cover"
                  />
                </Card>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
