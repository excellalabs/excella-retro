var validators = require('./validators');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema({
    text: { type: String, trim: false, validate: validators.buildLengthValidator('text', 2, 1000) },
    boardId: { type: Schema.Types.ObjectId }
});

CardSchema.statics = {
    
    /**
     * List all cards with the given boardId
     *
     * @param {Schema.Types.ObjectId} boardId
     * @param {Function} callback
     * @api public
     */
    getAllForBoard: function(boardId, callback) {
        if (boardId == undefined) {
            return callback("Invalid or missing board id");
        }
        if (!(boardId instanceof Schema.Types.ObjectId)) {
            boardId = new Schema.Types.ObjectId(boardId);
        }
        var criteria = { boardId: boardId }; // set up the search criteria
        this.find(criteria) // apply search criteria
            .exec(callback); // make request and pass results to callback function
    }
}

return mongoose.model('Card', CardSchema);
