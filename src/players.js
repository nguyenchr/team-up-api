var _ = require('lodash')
,  db = require('./db')

module.exports = {
  create: function* () {
    var player = this.request.body
    console.log('creating player', player)
    var savedPlayer = yield db.persist(_.defaults(player, {
      performance: 0,
      gamesPlayed: 0
    }))
    this.status = 200
    this.body = savedPlayer
  },
  getAll: function* () {
    console.log('getting players')
    var players = yield db.get()
    this.body = { players: players }
  },
  get: function* (id) {
    console.log('getting player', id)
    var players = yield db.get()
    var player = _.find(players, {id:id})
    if(player) {
      this.body = player
    } else {
      this.status = 404
    }

  }
}
