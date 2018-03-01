'use strict'
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
  module.exports=DataStore;
}

function DataStore(){
    return {
      save: save,
      getGames: getGames,
    }

    var games=[];

    function save(gamesToStore){
      games=gamesToStore;
    }

    function getGames(){
      return games;
    }
}
