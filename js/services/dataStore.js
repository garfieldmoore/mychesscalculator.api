'use strict';
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
  module.exports=DataStore;
}

var games=[];

function DataStore(){
    return {
      save: save,
      getGames: getGames,
    };


    function save(gamesToStore){
      games=gamesToStore;
    }

    function getGames(){
      return games;
    }
}
