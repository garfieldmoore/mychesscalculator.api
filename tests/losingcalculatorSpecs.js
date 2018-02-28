describe("ECF losing games", () => {

  beforeEach(function() {
  });

  var chessGradeCalculator;
  beforeEach(function() {
    chessGradeCalculator = service;
  });

  it('grade should decrease to 85 when a 100 grade loses to a 120 grade', () => {

    var games = [{
      id: 'game1',
      grade: 120,
      result: -1
    }];

    var grade = chessGradeCalculator.calculate(100, games, 'ECF');
    expect(grade).toEqual(85, "grade decreases");
  });
});
