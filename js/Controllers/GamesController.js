'use strict';
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
  module.exports=GamesController;
}

var DataStore = require('../services/dataStore');

function GamesController(){
  return{
    get: get,
    post: post,
  }

  function get(req, res){
    console.log("ENTER: GET /games");
    // get from local storage

    var dataStore= new DataStore();
    var response = dataStore.getGames();

    console.log("Number of games: " + response.length);
    console.log("games: " + response);

    res.json(response);
  }

  function post(req, res){
    console.log("ENTER: POST /games");
    console.log(req.body);

    var dataStore= new DataStore();
    dataStore.save(req.body);
    res.send(true);
  }
}
