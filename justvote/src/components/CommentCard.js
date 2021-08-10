import React from 'react';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        textAlign: "left",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    name: {
        fontSize: 18,

    },
    comment: {
        fontSize: 12,
        marginBottom: 12,
    },
});



export default function CommentCard(comment) {
    const classes = useStyles();
    let canDelete = false;
    if (comment.commentUserID == comment.userId)
        canDelete = true;
    const sendCommentId = () => {
        comment.deleteComment(comment.commentID)
    }
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.name}>
                    {comment.commentNickName}
                </Typography>
                <Typography className={classes.comment}>
                    {comment.commentContent}
                </Typography>
            </CardContent>
            <CardActions>
                {canDelete?(
                     <Button size="small" variant="outlined" onClick={sendCommentId} index={comment.commentID}>x</Button>
                ): null}
                
            </CardActions>
        </Card>
    );
}