// test.js
const server = require('./app');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('GET /', () => {
  it('should respond with a 200 status code', async () => {
    const res = await requestWithSupertest.get('/');
    expect(res.status).toBe(200);
  });

  it('should respond with the text "Hello World!"', async () => {
    const res = await requestWithSupertest.get('/');
    expect(res.text).toBe('Hello World!');
  });
});

describe('GET /download', () => {
  it('should download a file', async () => {
    const res= await requestWithSupertest.get('/download');
    expect(res.status).toEqual(200);
    expect(res.headers['content-type']).toBe('application/zip');
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  server.close();
});