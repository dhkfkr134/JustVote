import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import { Link } from "react-router-dom";

import testImage from "../img/content_img.png";

import image1 from "../img/content/1cafe.PNG";
import image2 from "../img/content/2food.PNG";
import image3 from "../img/content/3notebook.PNG";
import image4 from "../img/content/4phone.PNG";
import image5 from "../img/content/5popsong.PNG";
import image6 from "../img/content/6stage.PNG";
import image7 from "../img/content/7dog.png";

import PropTypes from "prop-types";

console.log(image1.type);
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function MediaCard({
  voteID,
  voteHits,
  makerID,
  userID,
  voteRegDate,
  voteTitle,
  count,
  isLikeContent,
  handlePushLikeBt,
  handlePushDislikeBt,
}) {
  const classes = useStyles();

  console.log(voteID);
  console.log(userID);
  console.log(isLikeContent);
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

  const handleLikeBt = (e) => {
    let body = {
      voteID: voteID,
      //userID: userID,
    };

    handlePushLikeBt(body);
  };

  const handleDislikeBt = (e) => {
    let body = {
      voteID: voteID,
      //userID: userID,
    };

    handlePushDislikeBt(body);
  };

  let checkCurrentUser = 0;

  // 0이면 로그인X
  // 1이면 로그인O
  if (userID === "NONE") {
    checkCurrentUser = 0;
  } else {
    checkCurrentUser = 1;
  }

  // 좋아요 안눌려 있다면 빈 하트
  const isNotLikeContentBt = (
    <div>
      <IconButton aria-label="add to favorites" onClick={handleLikeBt}>
        <FavoriteBorderIcon />
      </IconButton>
    </div>
  );

  // 좋아요 눌려 있으면 채운 하트
  const isLikeContentBt = (
    <div>
      <IconButton aria-label="cancel to favorites" onClick={handleDislikeBt}>
        <FavoriteIcon />
      </IconButton>
    </div>
  );

  // 로그인 안되어 있을 때 빈 하트
  const likeBT = (
    <div>
      <IconButton aria-label="need to login">
        <FavoriteBorderIcon />
        <a href="/SignIn"></a>
      </IconButton>
    </div>
  );

  return (
    <Card className={classes.root}>
      <Link to={`/content/${voteID}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={images}
            title={voteTitle}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {voteTitle}
            </Typography>
            <Typography variant="caption" display="block" color="textSecondary">
              작성자 : {makerID}
            </Typography>
            <Typography variant="caption" display="block" color="textSecondary">
              등록일 : {voteRegDate}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <div>
          {checkCurrentUser ? (
            <div> {isLikeContent ? isLikeContentBt : isNotLikeContentBt}</div>
          ) : (
            <div>{likeBT}</div>
          )}
        </div>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  handlePushLikeBt: PropTypes.func,
  handlePushDislikeBt: PropTypes.func,
};

MediaCard.defaultProps = {
  handlePushLikeBt: () => {
    console.error("handlePushLikeBt function not defined");
  },
  handlePushDislikeBt: () => {
    console.error("handlePushDislikeBt function not defined");
  },
};

export default MediaCard;