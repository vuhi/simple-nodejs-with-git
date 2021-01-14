const request = require('supertest');

describe('[index.spec.js]', () => {
  describe('>> [GET] /', () => {

    var server;
    beforeEach(function () {
      server = require('../src/index');
    });

    afterEach(function (done) {
      server.close(done);
    });

    it(`it should return 200`, async () => {  
      return request(server).get('/')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => expect(res.body).toEqual('hello world'));
    });
  });
});