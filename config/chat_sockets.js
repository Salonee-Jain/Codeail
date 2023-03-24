const Chat = require('../models/chat')

// const env = require('./environment');
// const app = require('express')();
// const loger = require('morgan')

// app.use(loger(env.morgan.mode, env.morgan.options))
module.exports.chatSockets = function(socketServer){
    let io= require('socket.io')(socketServer,{
        cors:{
            origin:"*"
        }})
console.log("conected")
    io.sockets.on('connection', function(socket){
        // console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        
        socket.on('join_room', function(data){
            // console.log('joining request rec.', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            Chat.create(data)
            io.in(data.chatroom).emit('receive_message', data);
        });

    });

}