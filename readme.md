# Chess Grade Calculator API
API to calculate ELO and ECF chess grades.

Node Learning project.

## HTTP API

The below table describes the allowed endpoints and http verbs.

| URL  | Method |Description | Returns |
|-------------|----------|---------|
| ```api/games/```  |GET   | Returns all a players Games| games |
| ```api/games/```  | POST  | saves games| 200 |
| ```api/ratings/ecf/```  | GET  | Calculates ECF rating | rating json |
| ```api/ratings/fide/```  | GET  | Calculates FIDE rating | rating json |
| ```api/ratings/uscf/``` | GET  | Calculates USCF rating | rating json |
|```api/statistics/```|GET|Calculates player stats | [Stats Json](#Player-stats-JSON) |


| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

## JSON formats
This section lists the JSON formats used / returned by the API end points.

#### Settings
The settings type contains information about player preferences; starting grade, kfactor used in ELO calculations etc.

Initially, the settings are not persisted and it is assumed the grade starts at 1200 with a kfactor of 20.

However, eventually we will need to persist and retrieve these settings;

```json
settings{
  kfactor: 20,
  player{
    grade: 200,
  }  
}

```

#### Games
The games will need to be persisted and retrieved.  This should contain, the name of the opponent, grade, the result of the game (0, 1, or -1) and the grading body.

The grading body is required so that a player can add games across national and international bodies.

The API stores and retrieves all games.

```json
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
```

#### Ratings
The endpoints for ratings return the same json object containing the result of the calculation;

```json
  {
    rating:200,
  }
```

#### Player stats JSON
These are implemented client side and are included here for completeness.

```json
Stats[
  {
    name : "stat name",
    value: "statistic value",
  }
]

```
