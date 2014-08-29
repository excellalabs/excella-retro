var validators = require('./validators');
var mongoose = require('mongoose');
var md5 = require('blueimp-md5').md5;
var Schema = mongoose.Schema;

var BoardSchema = new Schema({
    title: { type: String, trim: true, validate: validators.buildLengthValidator('title', 2, 50) },
    phase: { type: String, trim: false, validate: validators.buildLengthValidator('phase', 2, 50) },
    scrumMasterHash: { type: String, trim: false, validate: validators.buildLengthValidator('scrum master', 32, 32)  }
});

function pare (board){
    return board;
}

BoardSchema.statics = {

    /**
     * Create new Board
     * @param {Function} callback
     * @api public
     */
    generate: function(user, callback){
        var board = new Board({ title: 'My Board', phase: 'prelim', scrumMasterHash: md5(user) });
        board.save(callback);
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

var Board = mongoose.model('Board', BoardSchema);

return Board;