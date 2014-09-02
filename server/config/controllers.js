/* jslint node: true */
module.exports = function(server) {
    "use strict";
    return {
        base: require('../controllers/base'),
        assets: require('../controllers/assets'),
        board: require('../controllers/boardController')(server)
    };
};
