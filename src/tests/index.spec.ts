import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Ensure endpoints', () => {
  it('checks the /api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    expect(response.text).toBe('server is running');
  });
});
