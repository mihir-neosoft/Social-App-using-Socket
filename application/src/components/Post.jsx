import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import ShareIcon from '@mui/icons-material/Share';

import { getpost, commentonpost } from '../API/index';
const socket = io(`http://localhost:3030`);

export default function Post() {
    var username = sessionStorage.getItem('username');
    var postid = sessionStorage.getItem('post_id');
    const [comment, setComment] = useState("");
    const [post, setPost] = useState({ comments: [] });
    useEffect(() => {
        getpost(postid).then(res => {
            setPost(res.data);
        })
        var messages = document.getElementById('messages');
        socket.on('comment', (msg) => {
            var item = document.createElement('p');
            item.innerHTML = msg;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
    }, []);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }
    const handleCommentPost = () => {
        let sendcomment = `<b> ${username} </b> ${comment}`;
        socket.emit('comment', sendcomment);
        let data = { username: username, msg: comment }
        commentonpost(postid, data);
        setComment("");
    }

    return (
        <div>
            <Card elevation={4} sx={{ marginTop: 5, marginBottom: 5, marginLeft: "auto", marginRight: "auto", maxWidth: 600 }}>
                <CardHeader
                    avatar={
                        <Avatar>
                            <AccountCircleIcon />
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="more">
                            <MoreHorizIcon />
                        </IconButton>
                    }
                    title={post.username}
                    subheader={post.createdAt}
                />
                <CardMedia
                    component="img"
                    image={post.img}
                    alt="Postimg"
                />
                <CardActions disableSpacing>
                    <IconButton aria-label="like">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="comment">
                        <CommentIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <SendIcon />
                    </IconButton>
                    <IconButton sx={{ marginLeft: "auto" }} aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
                <CardContent id="messages">
                    {post.desc}
                    {post.comments.map((comment, index) =>
                        <p key={index}><b>{comment.username}</b> {comment.msg}</p>
                    )}
                </CardContent>
                <CardActions>
                    <IconButton aria-label="comment">
                        <CommentIcon />
                    </IconButton>
                    <TextField label="Add a Comment" id="comment" name="comment" variant="standard" value={comment} onChange={handleCommentChange} fullWidth />
                    <Button onClick={handleCommentPost}>Post</Button>
                </CardActions>
            </Card>
        </div >
    )
}
