
import request from 'supertest';
import app from '../server.js';

describe('GET /', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
