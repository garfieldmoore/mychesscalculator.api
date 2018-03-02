var test = require('supertest');
var app= require('../server.js');

describe("/home", () => {

  var request;
  beforeEach(function () {
    request = test.agent(app);
  });

  it('should return http OK response', () => {
    return request.get("/").expect(200);
  });
});

describe("/api/games", () => {

  var request;
  beforeEach(function () {
    request = test.agent(app);
  });

  it('should return http OK response', () => {
    return request.get("/api/games").expect(200);
  });

  describe("/api/rating", () => {

    var request;
    beforeEach(function () {
      request = test.agent(app);
    });

    it('should return not found error', () => {
      return request.get("/api/ratings").expect(404);

    });

    it('/api/ecf should return http OK response', () => {
      return request.get("/api/rating/ecf").expect(200);

    });

    it('/api/fide should return http OK response', () => {
      return request.get("/api/rating/fide").expect(200);

    });

    it('/api/uscf should return http OK response', () => {
      return request.get("/api/rating/uscf").expect(200);
    });
  });
});
