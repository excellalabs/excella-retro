module.exports = {
    getBoards: {
        handler: function(request, reply){
          reply('hello world');
        },
        app: {
            name: 'board'
        }
    },
  }