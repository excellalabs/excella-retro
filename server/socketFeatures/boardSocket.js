/* jslint node: true */
'use strict';

var io = require('../config/socketSetup').instance;
var board = require('../models/board');
var lock = require('../../shared/lock');


io.sockets.on('connection', function(socket){
    socket.on('room', function(boardId, name){
        lock(socket.id, function(release){
            var notOnBoard = true;
            var oldId = socket.boardId;
            var oldName = socket.name;
            socket.boardId = boardId;

            console.log(boardId + ', ' + name + ' :: ' + oldId + ', ' + oldName);

            var joinNewBoard = function(){
                board.joinBoard(boardId, name, function(err, participants){
                    console.log(name + ' joined with ' + err);
                    if(err){
                        socket.emit('fail', 'room', err);
                        return;
                    }
                    socket.name = name;
                    socket.emit('success', 'room', participants);
                    io.to(boardId).emit('joined', participants);
                    release();
                });
            };

            if(oldId !== undefined){
                board.leaveBoard(oldId, oldName, function(err, part){
                    joinNewBoard();
                });
                if(oldId === boardId){
                    notOnBoard = false;
                }
            } else {
                joinNewBoard();
            }

            if(notOnBoard){
                socket.leave(socket.boardId);
                socket.join(boardId);
            }
        });
    });

    socket.on('disconnect', function(){
        console.log(socket.name + ' left from ' + socket.boardId);
        if(socket.boardId !== undefined){
            board.leaveBoard(socket.boardId, socket.name, function(err, participants){
                console.log(err);
                console.log(participants);
                io.to(socket.boardId).emit('joined', participants);
            });
            socket.leave(socket.boardId);
        }
    });
});
