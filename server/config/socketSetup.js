/* jslint node: true */
"use strict";

var SocketIO = require('socket.io');

exports = module.exports = function(server){
    var io = exports.instance = SocketIO.listen(server.listener);

    io.sockets.on('connection', function(socket){
        socket.on('room', function(boardId){
            if(socket.boardId !== undefined){
                if(socket.boardId === boardId){ return; }
                socket.leave(socket.boardId);
            }
            socket.join(boardId);
            socket.boardId = boardId;
        });
    });
};