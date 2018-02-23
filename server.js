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
  res.send('Welcome to my API!')
})

app.listen(3000, () => {
  console.log('Chess server listening on port 3000!')
})
