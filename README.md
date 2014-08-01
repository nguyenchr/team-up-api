# team-up-api

Keeps track of team performance so that you can generate 2 well matched teams.


# Running

This is a [KOA](http://koajs.com/) server so will require an unstable version of `node` to be run with the `--harmony` flag.
[n](https://www.npmjs.org/package/n) is a pretty cool node version manager.

You can use it to run this app with

`n use 0.11.12 --harmony src/start.js`


# API

First create a few players. You can specify linked accounts (github, twitter) that will be used to get an avatar. Or course there's the corresponding GET, PUT and DELETE routes.

`POST /players`

```
{
  "name": "Chris",
  "accounts": {
    "github": "nguyenchr"
  }
}
```

You can get the list of all registered players. The app can then display all players, and let you pick who's available today.

`GET /players`

```
{
  "players": [
    { "id": 1, "name": "Chris",   "avatar": "https://avatars0.githubusercontent.com/u/189105?v=1&s=460" }
    { "id": 2, "name": "Shane",   "avatar": "https://avatars0.githubusercontent.com/u/189105?v=1&s=460" }
    { "id": 3, "name": "Dave",    "avatar": "https://avatars0.githubusercontent.com/u/189105?v=1&s=460" }
    { "id": 4, "name": "Srushti", "avatar": "https://avatars0.githubusercontent.com/u/189105?v=1&s=460" }
  ]
}
```

Once you've chosen who's playing, you can request ideal teams. Each team has a performance index between 0 and 5, based on

previous individual player performance
previous team performance if some of these players have played together before
`GET /teams?players=1,2,4,6,7`

```
{
  "teams": [
    {
      "performance": 3.6,
      "players": [
        { "id": 1, "name": "Chris" },
        { "id": 3, "name": "Dave"  }
      ]
    },
    {
      "performance": 4.0,
      "players": [
        { "id": 2, "name": "Shane"   },
        { "id": 4, "name": "Srushti" }
      ]
    }
  ]
}
```

After the game, you can post the score so the API can adapt its performance indexes for next time.

`POST /score` ** NOT IMPLEMENTED YET **

```
{
  "teams": [
    {
      "players": [1, 3],
      "score": 4
    },
    {
      "players": [2, 4],
      "score": 2
    }
  ]
}
```

# TODO

* Post score route
* Persist data
* Figure out what data to persist
* Return the performance rating of each team
