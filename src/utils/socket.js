import { io } from 'socket.io-client';

// socket connection
const socket = io(process.env.REACT_APP_LOCAL_API_URL, {
    transports: ['websocket', 'polling', 'flashsocket'],
    timeout: 1000,
    reconnectionAttempts: 10
});

socket.on('connect', () => {
    console.log('connected', socket.id);
});

export default socket;
