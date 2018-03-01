# Chess Grade Calculator API
API to calculate ELO and ECF chess grades.

Node Learning project.

## HTTP API

The below table describes the allowed endpoints and http verbs.

| URL          | Method     |Description | Returns |
| ------------ | ---------- |---------   |---------|
| ```api/games/```  |GET    | Returns all a players Games| [Games ](#games) |
| ```api/games/```  | POST  | saves games| [HTTP OK](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_Success) |
| ```api/ratings/ecf/```  | GET  | Calculates ECF rating | [Rating ](#ratings) |
| ```api/ratings/fide/```  | GET  | Calculates FIDE rating | [Rating ](#ratings) |
| ```api/ratings/uscf/``` | GET  | Calculates USCF rating | [Rating ](#ratings) |
|```api/statistics/```|GET|Calculates player stats | [Player statistics](#player-stats) |

### Design Considerations



## JSON formats
This section lists the JSON formats used / returned by the API end points.

#### Settings
The settings type contains information about player preferences; starting grade, kfactor used in ELO calculations etc.

Initially, the settings are not persisted and it is assumed the grade starts at 1200 with a kfactor of 20.

However, eventually we will need to persist and retrieve these settings;

```json
{
  "kfactor": 20,
  "player":{
    "initial_grade": 200,
  }  
}

```

#### Games
The games contain the name of the opponent, grade, the grading body and the result of the game (0, 1, or -1).

The grading body is required so that a player can add games across national and international bodies.

The API currently stores and retrieves all games.

```json
[
{
  "opponent": "name",
  "grade": "1200",
  "result": "0 | 1 | -1",
  "grading_body": "FIDE | USCF | ECF"
},
{
  "opponent": "player 2",
  "grade": "1500",
  "result": "0 | 1 | -1"
},

]
```

#### Ratings
The endpoints for ratings return the same json object containing the result of the calculation;

```json
  {
    "rating":200,
  }
```

#### Player stats
These are currently implemented client side and are included here for completeness as they will be moving onto the API eventually.

```json
[
  {
    "name" : "stat name",
    "value": "statistic value",
  }
]

```
