import apiClient from 'service/service';
import socket from './socket';

const sendNotification = async (users, message, task) => {
    const { data } = await apiClient().post('notification/task', { task, users, message });
    socket.emit('broadcastNotification');
};

export const taskAddNotification = async (task) => {
    try {
        const user = [task?.assignee?._id];
        const userName = `${task?.reporter?.firstName} ${task?.reporter?.lastName}`;
        const message = `${userName} has assigned you new task ${task?.title}`;
        await sendNotification(user, message, task?._id);
    } catch (error) {
        console.log(error);
    }
};

export const taskReviewNotfication = async (task) => {
    const user = [task?.reporter?._id];
    const userName = `${task?.assignee?.firstName} ${task?.assignee?.lastName}`;
    const message = `${userName} has requested you to review task ${task?.title}`;
    await sendNotification(user, message, task?._id);
};

export const taskCompleteNotification = async (task) => {
    const user = [task?.assignee?._id];
    const userName = `${task?.reporter?.firstName} ${task?.reporter?.lastName}`;
    const message = `${userName} has successfully reviewed your task ${task?.title} and marked as complete`;
    await sendNotification(user, message, task?._id);
};

export const taskReOpenNotification = async (task) => {
    const user = [task?.assignee?._id];
    const userName = `${task?.reporter?.firstName} ${task?.reporter?.lastName}`;
    const message = `${userName} has re-opened task ${task?.title}`;
    await sendNotification(user, message, task?._id);
};
