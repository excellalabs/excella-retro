var md5 = require('blueimp-md5').md5;
var db = require('./database');

module.exports = {
    /**
     * Create new Board
     * @param {Function} callback
     * @api public
     */
    create: function(user, boardName, guid, callback){
        var board = { id: guid, title: boardName, phase: 'initial', scrumMasterHash: md5(user) };
        db.put(guid, board, function(err) {
            if (err) {
                console.log('Create failed: ', err);
            }

            callback(err, board);
        });
    },
    get: function(guid, callback){
        db.get(guid, function(err, board) {
            if (err) {
                console.log('Create failed: ', err);
            }

            callback(err, board);
        });
    },
    /**
     * Create new Board
     * @param {Function} callback
     * @api public
     */
    getById: function(user, callback){
        if(!scrumMasterValidation[0](user)){
            return callback(scrumMasterValidation[1]);
        }
        var board = new Board({ title: 'My Board', phase: 'prelim', scrumMasterHash: md5(user) });
        board.save(callback);
    },
    /**
     * Create new Board
     * @param {Function} callback
     * @api public
     */
    getByIdParedDown: function(user, callback){
        if(!scrumMasterValidation[0](user)){
            return callback(scrumMasterValidation[1]);
        }
        var board = new Board({ title: 'My Board', phase: 'prelim', scrumMasterHash: md5(user) });
        board.save(callback);
    },
    /**
     * Save the Board identified by the given boardId with the specified updates
     *
     * @param {Schema.Types.ObjectId|String} boardId
     * @param {?} scrumMaster
     * @param {Object} update
     * @param {Function} callback
     * @api public
     */
    ensureScrumMasterAndUpdate: function(boardId, scrumMaster, update, callback) {
        var conditions = {
            _id: boardId,
            scrumMasterHash: md5(scrumMaster)
        };
        Board.findOneAndUpdate(conditions, update, callback);
    }
};