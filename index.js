const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const cors = require('cors');

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./manageUsers');

const server = express();
const app = http.createServer(server);
const io = socketio(app);


const PORT = process.env.PORT || 4000;


server.use(cors());

server.use(router);


io.on('connection', (socket) => {

    console.log(`new Client has been joined`);



    socket.on('client-join', ({ name, room }, callback) => {
        globalName = name;// why it does not work

        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.emit('message', { user: 'Admin', mesg: ` ${user.name}, welcome to my chat on room ${user.room} ` });

        socket.broadcast.to(user.room).emit('message', { user: 'Admin', mesg: `${user.name}, new user had joind us` });

        socket.join(user.room);

        io.to(user.room).emit('roomOnlineUsers', { users: getUsersInRoom(user.room) })


        callback();

    });


    socket.on('sendMessage', (mesg, callback) => {

        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, mesg })
        callback();
    });

    socket.on('disconnect', () => {

        const removedUser = removeUser(socket.id);

        io.to(removedUser.room).emit('message', { user: 'admin', mesg: `${removedUser.name} has left .` });
        io.to(removedUser.room).emit('roomData', { users: getUsersInRoom(removedUser.room) });
    })
})

app.listen(PORT, () => {
    console.log(`server is up on ${PORT} `);
})