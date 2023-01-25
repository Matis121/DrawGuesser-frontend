import io from "socket.io-client";
const SOCKET_IO_URL = "https://drawguesser-backend.onrender.com/";
const socket = io(SOCKET_IO_URL, {transports: ['websocket']});

export default socket;
