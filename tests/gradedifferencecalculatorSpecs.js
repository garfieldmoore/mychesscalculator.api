var ChessGradeCalculator=require('../js/services/ChessGradeCalculator');

describe("ECF Maximum grade difference rule", () => {

  beforeEach(function() {
  });

  var chessGradeCalculator;

  beforeEach(function () {
    chessGradeCalculator= new ChessGradeCalculator();
  });

  it('grade should increase to 145 when a 100 grade beats a 150 grade ', () => {

    var games = [{
      id: 'game1',
      grade: 150,
      result: 1
    }];

    var grade = chessGradeCalculator.calculateEcf(100, games);
    expect(grade).toEqual(145, "grade increases");
  });

  it('grade should decrease to 120 when a 150 grade loses to a 100 grade ', () => {

    var games = [{
      id: 'game1',
      grade: 100,
      result: -1
    }];

    var grade = chessGradeCalculator.calculateEcf(150, games);
    expect(grade).toEqual(105, "grade decreases");
  });
});
