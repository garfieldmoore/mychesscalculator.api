var ChessGradeCalculator=require('../../js/services/ChessGradeCalculator');

describe("USCF ELO wins", () => {

  var chessGradeCalculator = new ChessGradeCalculator();

  it('should calcuate a 2000 player beating a 1953 player as having new USCF elo of 2009', () => {

    var games = [{
      id: 'game1',
      grade: 1953,
      result: 1
    }];

    var grade = chessGradeCalculator.calculateUscf(2000, games, 20);
    expect(grade).toEqual(2009, "grade increases");
  });

  it('converts from strings to numbers', () => {

    var games = [{
      id: 'game1',
      grade: '1953',
      result: 1
    }];

    var grade = chessGradeCalculator.calculateUscf('2000', games, 20);
    expect(grade).toBeGreaterThan(2000, "should be a number");
  });
});
