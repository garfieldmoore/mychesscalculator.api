var express = require('express');

var app = express();

var apiRouter = express.Router();

apiRouter.route('/games')
  .get(function(req, res){
    var response= {opponent: "s hall"};
    res.json(response);
  });

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Chess grade calculator V1.  Access API at /api')
})

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});
