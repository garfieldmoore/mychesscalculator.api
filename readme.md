Chess Grade Calculator API
--------------------------

API Requirements;

* Calculate an ECF Chess grades from a list of games
* Calculate a FIDE chess grade from a list of games (pass in K Factor)
* Calculate a USCF chess grade from a list of games (pass in K factor)
* Calculate player stats from results
- - These are calculated on the client to offload the work.  However, the JSON scheme below may be useful for the client.
* Get a players game list
* Save a players game list

Game JSON

Games[
{
  opponent: "name",
  grade: "1200",
  result: "0 | 1 | -1",
  grading_body: "FIDE | USCF | ECF"
},
{
  opponent: "player 2",
  grade: "1500",
  result: "0 | 1 | -1"
},

]

Player stats JSON

Stats[
  {
    name : "stat name",
    value: "statistic value",
  }
]

HTTP API

GET api/games/

Returns all a players Games

POST api/games

Saves all a players games
