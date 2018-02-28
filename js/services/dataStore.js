'use strict'

  var games=[];

module.exports={
    save: function (gamesToStore){
      games=gamesToStore;
    },

    getGames: function (){
      return games;
    }
  };
