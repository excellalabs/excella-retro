/* jslint node: true */
'use strict';

var io = require('../config/socketSetup').instance;
var board = require('../models/board');
var lock = require('../../shared/lock');
var constants = require('../../shared/constants/boardConstants');


io.sockets.on('connection', function(socket){
    socket.on(constants.socketEmitters.joinBoard, function(boardId, name, scrumMasterKey){
        lock(socket.id, function(release){
            var notOnBoard = true;
            var oldId = socket.boardId;
            var oldName = socket.name;
            socket.boardId = boardId;

            var joinNewBoard = function(){
                board.joinBoard(boardId, name, scrumMasterKey, function(err, participants, isScrumMaster){
                    if(err){
                        socket.emit(constants.socketEmitters.joinError, constants.socketEmitters.joinBoard, err);
                        return;
                    }
                    socket.name = name;
                    socket.emit(constants.socketEmitters.joinSuccess, constants.socketEmitters.joinBoard, participants);
                    io.to(boardId).emit(constants.socketEmitters.joined, participants);
                    if(notOnBoard && isScrumMaster) {
                        console.log('scrum master joined board');
                        socket.join(boardId + constants.scrumMasterRoomEnding);
                    }
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
        if(socket.boardId !== undefined){
            board.leaveBoard(socket.boardId, socket.name, function(err, participants){
                io.to(socket.boardId).emit(constants.socketEmitters.joined, participants);
            });
            socket.leave(socket.boardId);
        }
    });
});
