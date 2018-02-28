var ChessGradeCalculator=require('../js/services/ChessGradeCalculator');

describe("Calculating ECF drawn games", () => {

  var chessGradeCalculator;

  beforeEach(function () {
    chessGradeCalculator= new ChessGradeCalculator();
  });

  it('calculate should return players current grade when no games have been played', () => {

    var grade = chessGradeCalculator.calculateEcf(102, []);
    expect(grade).toEqual(102, "The grades should be the same");

  });

  it('current grade should not change when all the games played are drawn with players of the same grade', () => {

    var games = [{
      id: 'game1',
      grade: 102,
      result: 0
    }, {
      id: 'game2',
      grade: 102,
      result: 0
    }];

    var grade = chessGradeCalculator.calculateEcf(102, games);
    expect(grade).toEqual(102, "The grades should be the same");
  });

  it('new grade should increase to 110 when a 100 grade draws with a 120 grade', () => {

    var games = [{
      id: 'game2',
      grade: 120,
      result: 0
    }];

    var grade = chessGradeCalculator.calculateEcf(100, games);
    expect(grade).toEqual(110, "The grades should be the same");
  });

  it('new grade should decrease to 90 when a 100 grade draws with an 80 grade', () => {

    var games = [{
      id: 'game2',
      grade: 80,
      result: 0
    }];

    var grade = chessGradeCalculator.calculateEcf(100, games);
    expect(grade).toEqual(90, "The grades should be the same");
  });
});
