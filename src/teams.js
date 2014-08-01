var _     = require('lodash')
, db      = require('./db')
, teamUp  = require('team-up');

module.exports = {
  get: function* () {
    var teamPlayers = this.query.players.split(',')
    console.log('creating teams for players', teamPlayers)
    var allPlayers = yield db.get()
    var foundPlayers = _.filter(allPlayers, function(player) {
      return teamPlayers.indexOf(player.id.toString()) > -1
    })
    if(foundPlayers) {
      this.status = 200
      var teams = teamUp.sort(foundPlayers)
      this.body = {teams: removeExtraInformation(teams)}
    }
    else {
      this.status = 404
    }

  }
}

var removeExtraInformation = function(teams) {
  return _.map(teams, function(team) {
    return {
      players: _.map(team.players, function(player) {
        return _.omit(player, 'performance', 'gamesPlayed')
      })
    }
  })
}
