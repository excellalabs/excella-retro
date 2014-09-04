/* jslint node: true */
/* jslint browser: true */
'use strict';

module.exports = {
    guid: function () {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }

        return _p8() + _p8(true) + _p8(true) + _p8();
    },
    dotVotesAllowed: function (noOfItemsVotedOn) {
        if (noOfItemsVotedOn && noOfItemsVotedOn > 0) {
            return +((noOfItemsVotedOn / 3).toFixed()) + 1;
        }

        return 0;
    }
};
