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
import image7 from "../img/content/7dog.png";

console.log(image1.type);
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({
  voteID,
  voteHits,
  userID,
  voteRegDate,
  voteTitle,
  count,
}) {
  const classes = useStyles();

  console.log(count);
  let images = new Image();

  if (count === 0) {
    images = image1;
  } else if (count === 1) {
    images = image2;
  } else if (count === 2) {
    images = image3;
  } else if (count === 3) {
    images = image4;
  } else if (count === 4) {
    images = image5;
  } else if (count === 5) {
    images = image6;
  } else if (count === 6) {
    images = image7;
  } else {
    images = testImage;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={images}
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
