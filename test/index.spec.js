const request = require('supertest');

describe('[index.spec.js]', () => {
  describe('>> [GET] /', () => {

    var server;
    beforeAll(() => {  server = require('../src/index'); });
    afterAll(() => { server.close(); });

    it(`it should return 200 & hello world`, async () => {  
      await request(server).get('/')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => expect(res.body).toEqual(
          expect.objectContaining({ message: expect.stringContaining('health check')})
        ));
    });
  });
});