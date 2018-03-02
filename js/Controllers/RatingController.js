'use strict';

if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
  module.exports=RatingController;
}

var ChessGradeCalculator = require('../services/ChessGradeCalculator');
var DataStore = require('../services/dataStore');

function RatingController(){
  return{
    getEcfRating: getEcfRating,
    getFideRating: getFideRating,
    getUscfRating: getUscfRating,
  };

  function getEcfRating(req, res){
    console.log("ENTER: GET /rating/ecf");
    console.log(req.body);

    var currentGrade = parseInt(req.query.currentgrade);
    console.log("query currentGrade: " + currentGrade);

    var chessGradeCalculator = new ChessGradeCalculator();
    var dataStore= new DataStore();
    var ratingEcf=chessGradeCalculator.calculateEcf(currentGrade, dataStore.getGames());

    var rating={
      rating: ratingEcf,
    };

    console.log("Rating: " + rating.rating);

    res.json(rating);
  }

  function getFideRating(req, res){
    console.log("ENTER: GET /rating/fide");

    var currentGrade = parseInt(req.query.currentgrade);
    console.log("query currentGrade: " + currentGrade);
    var kfactor=req.query.kfactor;
    console.log("Kfactor: " + kfactor);

    if (kfactor == undefined){
      kfactor=20; //default
    }

    var dataStore= new DataStore();
    var chessGradeCalculator = new ChessGradeCalculator();
    var ratingFide=chessGradeCalculator.calculateFide(currentGrade, dataStore.getGames(), kfactor);
    var rating={
      rating: ratingFide,
    };

    console.log("Rating: " + rating.rating);

    res.json(rating);
  }

  function getUscfRating(req, res){
    console.log("ENTER: GET /rating/uscf");
    // persist to local storage
    var currentGrade = parseInt(req.query.currentgrade);
    console.log("query currentGrade: " + currentGrade);
    var kfactor=req.query.kfactor;
    console.log("Kfactor: " + kfactor);

    if (kfactor == undefined){
      kfactor=20; //default
    }

    var dataStore = new DataStore();
    var chessGradeCalculator = new ChessGradeCalculator();
    var ratingUscf=chessGradeCalculator.calculateUscf(currentGrade, dataStore.getGames(), kfactor);
    var rating={
      rating: ratingUscf,
    };

    console.log("Rating: " + rating.rating);

    res.json(rating);
  }
}
