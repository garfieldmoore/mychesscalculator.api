var express = require('express');
var ChessGradeCalculator = require('./js/services/ChessGradeCalculator');
var chessGradeCalculator = new ChessGradeCalculator();
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var apiRouter = express.Router();

var DataStore = require('./js/services/dataStore');
dataStore = new DataStore();

apiRouter.route('/games')
  .get(function(req, res){
    console.log("ENTER: GET /games");
    // get from local storage

    var response = dataStore.getGames();

    console.log("Number of games: " + response.length);
    console.log("games: " + response);

    res.json(response);
  })
  .post(function(req, res){
    console.log("ENTER: POST /games");
    console.log(req.body);

    dataStore.save(req.body);
    res.send(true);

  });

apiRouter.route('/rating/ecf')
    .get(function(req, res){
      console.log("ENTER: GET /rating/ecf");
      console.log(req.body);

      var currentGrade = parseInt(req.query.currentgrade);
      console.log("query currentGrade: " + currentGrade);

      var rating=chessGradeCalculator.calculateEcf(currentGrade, dataStore.getGames());
      var rating={
        rating: rating,
      };

      console.log("Rating: " + rating.rating);

      res.json(rating);
    });

  apiRouter.route('/rating/fide')
      .get(function(req, res){
        console.log("ENTER: GET /rating/fide");

        var currentGrade = parseInt(req.query.currentgrade);
        console.log("query currentGrade: " + currentGrade);
        var kfactor=req.query.kfactor;
        console.log("Kfactor: " + kfactor);

        if (kfactor == undefined){
          kfactor=20; //default
        }

        var rating=chessGradeCalculator.calculateFide(currentGrade, dataStore.getGames(), kfactor);
        var rating={
          rating: rating,
        };

        console.log("Rating: " + rating.rating);

        res.json(rating);
      });

  apiRouter.route('/rating/uscf')
      .get(function(req, res){
        console.log("ENTER: GET /rating/uscf");
        // persist to local storage
        var currentGrade = parseInt(req.query.currentgrade);
        console.log("query currentGrade: " + currentGrade);
        var kfactor=req.query.kfactor;
        console.log("Kfactor: " + kfactor);

        if (kfactor == undefined){
          kfactor=20; //default
        }

        var rating=chessGradeCalculator.calculateUscf(currentGrade, dataStore.getGames(), kfactor);
        var rating={
          rating: rating,
        };

        console.log("Rating: " + rating.rating);

        res.json(rating);
      });


  //CORS middleware
  var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
      res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8081');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

      next();
  }

app.use(allowCrossDomain);
app.use('/api', apiRouter);
app.get('/', (req, res) => {
  res.send('Chess grade calculator V1.  Access API at /api')
})

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log("Starting Chess API Server");
  console.log('Setting the port to listen on from env.PORT (defaults to 3000)');
  console.log('Server running at http://127.0.0.1:' + port + '/');

});
