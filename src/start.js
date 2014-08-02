var koa      = require('koa')
, route      = require('koa-route')
, bodyParser = require('koa-bodyparser')
, players    = require('./players')
, teams      = require('./teams')
, score      = require('./score')
, app        = koa();

PORT = 3000

app.use(bodyParser())
// x-response-time

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response
app.use(route.get ('/players/:id', players.get));
app.use(route.get ('/players', players.getAll));
app.use(route.post('/players', players.create));

app.use(route.get ('/teams', teams.get));

app.use(route.post ('/score', score.processScore))

app.listen(PORT);
console.log("APP Listening on port", PORT)
