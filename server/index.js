const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

// initialize
const app = express();
const server = http.createServer(app);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// db connect
const connect_db = require('./config/db');
connect_db();

// routes
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

// socket.io 
const io = socketio(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
io.on('connection', (socket) => {
    socket.on('comment', (msg) => {
        console.log(msg);
        io.emit('comment', msg);
    });
});

// Basic Chat App
// app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); });
app.get('/', (req, res) => { res.json({ status: 200, message: "Server Working" }) });

// host server
const PORT = 3030;
server.listen(PORT, () => { console.log(`listening on :http://localhost:${PORT}`); });