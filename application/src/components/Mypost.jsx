import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
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

import { getalluserpost } from '../API/index';
import io from 'socket.io-client';
const socket = io(`http://localhost:3030`);

export default function Mypost() {
        const navigate = useNavigate();
    var data = { "userid": sessionStorage.getItem('_id') };
    const [mypost, setMypost] = useState([]);
    useEffect(() => {
        getalluserpost(data).then(res => {
            setMypost(res.data)
        })
    }, []);
   const handlecomment = (id)=>{
       sessionStorage.setItem('post_id',id);
       navigate(`/post/${id}`);
   }
    return (
        <div>
            <h2>My Posts</h2>
            {mypost.map(post =>
                <Card key={post._id} elevation={4} sx={{ marginTop: 5, marginBottom: 5, marginLeft: "auto", marginRight: "auto", maxWidth: 600 }}>
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
                        <IconButton onClick={()=>handlecomment(post._id)} aria-label="comment">
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
                    </CardContent>
                    {/* <CardActions>
                        <IconButton aria-label="comment">
                            <CommentIcon />
                        </IconButton>
                        <TextField label="Add a Comment" id="comment" name="comment" variant="standard" onChange={handleCommentChange} fullWidth />
                        <Button onClick={handleCommentPost}>Post</Button>
                    </CardActions> */}
                </Card>
            )}
        </div>
    )
}
