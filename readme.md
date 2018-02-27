# Chess Grade Calculator API

## API Requirements;

* Calculate an ECF Chess grades from a list of games
* Calculate a FIDE chess grade from a list of games (pass in K Factor)
* Calculate a USCF chess grade from a list of games (pass in K factor)
* Calculate player stats from results
- - These are calculated on the client to offload the work.  However, the JSON scheme below may be useful for the client.
* Get a players game list
* Save a players game list
* Get settings
* Post settings


## JSON formats

### Settings
The settings type contains information about player preferences; starting grade, kfactor used in ELO calculations etc.

Initially, the settings are not persisted and it is assumed the grade starts at 1200 with a kfactor of 20.

However, eventually we will need to persist and retrieve these settings;

settings{
  kfactor: 20,
  player{
    grade: 200,
  }  
}

### Games
The games will need to be persisted and retrieved.  This should contain, the name of the opponent, grade, the result of the game (0, 1, or -1) and the grading body.

The grading body is required so that a player can add games across national and international bodies.

The API stores and retrieves all games.

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
