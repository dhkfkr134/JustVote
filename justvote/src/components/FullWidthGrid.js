import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MediaCard from "./MediaCard";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();
  const tmp = [1, 2, 3, 4];
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {tmp.map((x, index) => (
          <Grid item xs={6} sm={3}>
            <Link key={index} to={`/content/${tmp[index]}`}>
              <MediaCard />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
