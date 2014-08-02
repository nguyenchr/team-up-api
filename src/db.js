var _ = require('lodash');
var players = []
var playerId = 0

module.exports = {
  persist: function* (player) {
    console.log('saving player', player)
    var savedPlayer = _.defaults(player, {id: playerId++})
    players.push(savedPlayer);
    return savedPlayer;
  },
  get: function* () {
    console.log('retrieving players from db')
    return players
  },
  update: function* (player) {
    console.log('updating player', player)
    _.find(players, {id: player.id}) = player
    return
  }

}
