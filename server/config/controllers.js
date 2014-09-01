module.exports = function(server) {
    return {
        base: require('../controllers/base'),
        assets: require('../controllers/assets'),
        board: require('../controllers/boardController')(server)
    }
}
