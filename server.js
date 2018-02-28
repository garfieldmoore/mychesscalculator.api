var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var apiRouter = express.Router();

apiRouter.route('/games')
  .get(function(req, res){
    console.log("ENTER: GET /games");
    // get from local storage

    var response= [
      {id: 1, resultText:'Win', result:1, grade:1200},{id: 2, resultText:'Win', result:1, grade:1800}];
    res.json(response);
  })
  .post(function(req, res){
    console.log("ENTER: POST /games");
    // persist to local storage
    console.log(req.body);
  });

apiRouter.route('/rating')
    .get(function(req, res){
      console.log("ENTER: GET /rating");
      // persist to local storage
      console.log(req.body);

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
