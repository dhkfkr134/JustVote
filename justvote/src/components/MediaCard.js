import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import testImage from '../img/content_img.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard() {
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
          <Typography>10000명 참여</Typography>
          <Typography gutterBottom variant="h5" component="h2">
            펭수 vs 펭수
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            2021.04.05 업데이트 완료
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant="caption">작성자</Typography>
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