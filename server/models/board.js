var db = require('./database');
var helpers = require('../../shared/helpers.js');

function saveBoard(boardId, board, callback) {
    db.put(boardId, board, function(err) {
        if (err) {
            console.log('Create failed: ', err);
        }
        callback(err, board);
    });
}

module.exports = {
    create: function(user, boardName, scrumMasterKey, callback){
        var boardId = helpers.guid();
        var board = { id: boardId, title: boardName, phase: 'initial', scrumMasterKey: scrumMasterKey, participants: [ user ] };
        saveBoard(boardId, board, callback);
    },
    get: function(boardId, callback){
        db.get(boardId, function(err, board) {
            if (err) {
                console.log('Create failed: ', err);
            }

            callback(err, board);
        });
    },
    getBoardParticipants: function(boardId, callback){
        this.get(boardId, function(err, board) {
            callback(err, board.participants);
        });
    },
    joinBoard: function(boardId, user, callback) {
        this.get(boardId, function(err, board) {
            board.participants.push(user);
            saveBoard(boardId, board, function(err) {
                var joined = err === 'undefined';
                callback(err, joined);
            });
        });
    }
};