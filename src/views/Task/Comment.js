import { FormControl, Grid, TextField, Button, ListItem, Divider, ListItemText, ListItemAvatar, List, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import CustomFormHeader from 'ui-component/header/CustomFormHeader';
import Profile from 'ui-component/Profile';
import apiClient from 'service/service';
import { useState } from 'react';
import toast from 'react-hot-toast';
import React, { useEffect } from 'react';
import { startLoader, endLoader } from 'store/loaderSlice';
import socket from 'utils/socket';

const Comment = ({ task }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(({ user }) => user?.details);
    const [message, setMessage] = useState('');
    const [comments, setComments] = useState([]);

    const handleAddComment = async () => {
        try {
            if (!message) {
                toast.error('Please enter comment');
                return;
            }
            const { data } = await apiClient().post('/task/addComment', {
                task: task,
                user: currentUser?._id,
                message
            });
            setMessage('');
            socket.emit('broadcastComment', 'send');
            socket.emit('broadcastNotification', 'send');
            getTaskComments();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const getTaskComments = async () => {
        try {
            dispatch(startLoader());
            const { data } = await apiClient().get(`/task/comment/${task}`);
            setComments(data?.comments);
            dispatch(endLoader());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTaskComments();
        socket.on('fetchComment', (data) => getTaskComments());
    }, []);

    return (
        <>
            <Grid item xs={12} marginTop="10px">
                <CustomFormHeader content="Comments" />
            </Grid>
            <Grid item xs={12} display="flex">
                <Grid item xs={0.5} marginTop="5px">
                    <Profile src={currentUser?.profilePicture} alt="profile" sx={{ width: '38px', height: '38px' }} />
                </Grid>
                <Grid item xs={7.5} marginRight="5px">
                    <FormControl fullWidth>
                        <TextField
                            color="secondary"
                            name="comment"
                            value={message}
                            placeholder="Add a comment..."
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={1.5} marginTop="5px">
                    <Button color="secondary" size="medium" onClick={() => handleAddComment()}>
                        Save Comment
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ paddingLeft: '0px !important' }}>
                <List sx={{ bgcolor: 'background.paper', maxHeight: 300, overflowY: 'scroll' }}>
                    {comments?.map((comment) => (
                        <>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Profile src={comment?.user?.profilePicture} alt="profile" sx={{ width: '38px', height: '38px' }} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${comment?.user?.firstName} ${comment?.user?.lastName}`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                                {comment?.message}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    ))}
                </List>
            </Grid>
        </>
    );
};

export default Comment;
