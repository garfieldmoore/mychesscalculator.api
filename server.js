var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var apiRouter = express.Router();

var GamesController = require('./js/Controllers/GamesController');
var RatingController = require('./js/Controllers/RatingController');

var gamesController = new GamesController();
var ratingController = new RatingController();

console.log("Configuring routes:")

if (gamesController == undefined){
  console.log("Games route failed")
}

if (gamesController.get == undefined){
  console.log("Games GET route failed")
}

if (gamesController.post == undefined){
  console.log("Games POST route failed")
}

if (ratingController == undefined){
  console.log("Rating route failed")
}

apiRouter.route('/games')
  .get(gamesController.get)
  .post(gamesController.post);

apiRouter.route('/rating/ecf')
    .get(ratingController.getEcfRating);

  apiRouter.route('/rating/fide')
      .get(ratingController.getFideRating);

  apiRouter.route('/rating/uscf')
      .get(ratingController.getUscfRating);

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
