import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Ensure endpoints and responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server running');
  });
});
