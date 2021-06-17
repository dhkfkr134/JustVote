import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import testImage from "../img/content_img.png";
import image1 from "../img/content/1cafe.PNG";
import image2 from "../img/content/2food.PNG";
import image3 from "../img/content/3notebook.PNG";
import image4 from "../img/content/4phone.PNG";
import image5 from "../img/content/5popsong.PNG";
import image6 from "../img/content/6stage.PNG";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({
  voteHits,
  userID,
  voteRegDate,
  voteTitle,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={testImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {voteTitle}
          </Typography>
          <Typography variant="caption" display="block" color="textSecondary">
            작성자 : {userID}
          </Typography>
          <Typography variant="caption" display="block" color="textSecondary">
            등록일 : {voteRegDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Like
        </Button>
      </CardActions>
    </Card>
  );
}
