var _     = require('lodash')
, db      = require('./db');


var teamScoresToPlayerScores = function(team) {
  return _.map(team.players, function(player){
    return {
      id: player,
      score: team.score
    }
  })
}

module.exports = {
  processScore: function* () {
    var teams = this.request.body.teams
    console.log('creating score for teams', teams)
    var allPlayers = yield db.get()

    var playerScores = _.chain(teams)
      .map(teamScoresToPlayerScores)
      .flatten()
      .valueOf()

    var updatedPlayers = _.map(playerScores, function(player) {
      var currentState = _.find(allPlayers, {id:player.id});
      return _.extend(currentState, {
        gamesPlayed: ++ currentState.gamesPlayed,
        performance: currentState.performance += player.score
      })
    })

    _.each(updatedPlayers, function(player) {
      db.update(player)
    })

    this.status = 200

  }
}
