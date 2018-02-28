var express = require('express');

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

apiRouter.route('/rating')
    .get(function(req, res){
      console.log("ENTER: GET /rating");
      // persist to local storage
      console.log(req.body);
       dataStore.getGames();
      // perform calculation

      res.json({rating: 3000});
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
