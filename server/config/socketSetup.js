/* jslint node: true */
"use strict";

var SocketIO = require('socket.io');

exports = module.exports = function(server){
    if(exports.instance !== undefined){
        return;
    }

    var io = exports.instance = SocketIO.listen(server.listener);
};