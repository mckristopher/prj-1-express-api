import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import { getFilePath } from './helpers/common';

const request = supertest(app);
describe('Ensure endpoints', () => {
  it('checks the /api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    expect(response.text).toBe('server is running');
  });
});

describe('/api/image endpoint', () => {
  it('should return a jpeg image by default', async () => {
    const response = await request.get(
      '/api/images?fileName=encenadaport&width=200&height=200'
    );
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toBe('image/jpeg');
  });

  it('should resize the image as per input', async () => {
    const response = await request.get(
      '/api/images?fileName=encenadaport&width=100&height=100'
    );
    expect(response.status).toBe(200);
    expect(fs.existsSync(getFilePath('encenadaport', 100, 100)));

    const secondResponse = await request.get(
      '/api/images?fileName=fjord&width=500&height=500'
    );
    expect(secondResponse.status).toBe(200);
    expect(fs.existsSync(getFilePath('fjord', 500, 500)));
  });

  it('should throw an error if file name is missing in query', async () => {
    const response = await request.get('/api/images?width=100&height=100');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Some input value(s) are missing : fileName');
  });

  it('should throw an error if width is missing in query', async () => {
    const response = await request.get(
      '/api/images?fileName=encenadaport&height=100'
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('Some input value(s) are missing : width');
  });

  it('should throw an error if height is missing in query', async () => {
    const response = await request.get(
      '/api/images?fileName=encenadaport&width=100'
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('Some input value(s) are missing : height');
  });

  it('should throw an error if file with requested name does not exist', async () => {
    const response = await request.get(
      '/api/images?fileName=anyfilet&width=100&height=100'
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('File Not Found');
  });

  afterAll(() => {
    fs.unlinkSync(getFilePath('encenadaport', 200, 200));
    fs.unlinkSync(getFilePath('encenadaport', 100, 100));
    fs.unlinkSync(getFilePath('fjord', 500, 500));
  });
});
