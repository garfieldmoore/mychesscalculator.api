var express = require('express');
var chessGradeCalculator = require('./js/services/ChessGradeCalculator');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var apiRouter = express.Router();

var dataStore = require('./js/services/dataStore');

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

       res.json({rating: rating});
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

        res.json({rating: rating});
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

        res.json({rating: rating});
      });


  //CORS middleware
  var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
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
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
