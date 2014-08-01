var _     = require('lodash')
, db      = require('./db');

module.exports = {
  processScore: function* () {
    var teams = this.request.body.teams
    console.log('creating score for teams', teams)
    var allPlayers = yield db.get()

    var updatedPlayers = _.each(teams, function(team) {
      
    })

  }
}
