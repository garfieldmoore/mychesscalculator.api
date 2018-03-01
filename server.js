console.log("Loading dependencies:");
var express = require('express');
var GamesController = require('./js/Controllers/GamesController');
var RatingController = require('./js/Controllers/RatingController');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log("Configuring routes:");
var apiRouter = express.Router();

var gamesController = new GamesController();
var ratingController = new RatingController();

apiRouter.route('/games')
  .get(gamesController.get)
  .post(gamesController.post);

apiRouter.route('/rating/ecf')
    .get(ratingController.getEcfRating);

  apiRouter.route('/rating/fide')
      .get(ratingController.getFideRating);

  apiRouter.route('/rating/uscf')
      .get(ratingController.getUscfRating);

console.log("Configuring middleware");
  //CORS middleware
  var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
      res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8081');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

      next();
  }

console.log("Configuring API");
app.use(allowCrossDomain);
app.use('/api', apiRouter);
app.get('/', (req, res) => {
  res.send('Chess grade calculator V1.  Access API at /api')
})

var port = process.env.PORT || 3000;

console.log("Starting Server on port: " + port);

var server = app.listen(port, function () {
  console.log("Starting Chess API Server");
  console.log('Setting the port to listen on from env.PORT (defaults to 3000)');
  console.log('Server running at http://127.0.0.1:' + port + '/');

});
