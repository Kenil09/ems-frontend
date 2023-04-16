import apiClient from 'service/service';
import { useDispatch, useSelector } from 'react-redux';
import { startLoader, endLoader } from 'store/loaderSlice';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useEffect } from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { IconTrash } from '@tabler/icons';
import socket from 'utils/socket';

const Notification = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(({ user }) => user.details);
    const [notifications, setNotifications] = useState([]);

    const getNotifications = async () => {
        try {
            dispatch(startLoader());
            const { data } = await apiClient().get(`/notification`);
            setNotifications(data?.notifications);
            dispatch(endLoader());
        } catch (error) {
            dispatch(endLoader());
            toast.error('Unable to fetch data');
        }
    };

    const deleteNotification = async (id) => {
        try {
            dispatch(startLoader());
            const { data } = await apiClient().delete(`notification/${id}`);
            toast.success(data?.message);
            getNotifications();
            dispatch(endLoader());
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        getNotifications();
        socket.on('fetchNotification', (data) => getNotifications());
    }, []);

    return (
        <MainCard title="Notifications">
            <Grid container spacing={1}>
                {notifications.map((notification) => (
                    <Grid item xs={8} display="flex" flexDirection="row" alignItems="center" borderBottom="1px solid #ddd">
                        <Grid item xs={10}>
                            <Typography fontSize="1rem">{notification?.message}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton
                                color="secondary"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    deleteNotification(notification?._id);
                                }}
                                sx={{ color: 'error.main' }}
                            >
                                <IconTrash />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </MainCard>
    );
};

export default Notification;
