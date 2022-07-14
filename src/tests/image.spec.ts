import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import { getFilePath } from './helpers/common';

const request = supertest(app);

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
    expect(fs.existsSync(getFilePath('encenadaport', 100, 100))).toBe(true);

    const secondResponse = await request.get(
      '/api/images?fileName=fjord&width=500&height=500'
    );
    expect(secondResponse.status).toBe(200);
    expect(fs.existsSync(getFilePath('fjord', 500, 500))).toBe(true);
  });

  it('should return appropriate image type if fileType is set', async () => {
    const response = await request.get(
      '/api/images?fileName=encenadaport&width=200&height=200&fileType=png'
    );
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toBe('image/png');
  });

  afterAll(() => {
    fs.unlinkSync(getFilePath('encenadaport', 200, 200));
    fs.unlinkSync(getFilePath('encenadaport', 100, 100));
    fs.unlinkSync(getFilePath('fjord', 500, 500));
    fs.unlinkSync(getFilePath('encenadaport', 200, 200, 'png'));
  });
});

describe('/api/image error handling', async () => {
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
});

describe('/api/image incorrect value handling', async () => {
  it('should throw an error if file with requested name does not exist', async () => {
    const response = await request.get(
      '/api/images?fileName=anyfilet&width=100&height=100'
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid File Name Specified');

    const secondResponse = await request.get(
      '/api/images?fileName=file123&width=100&height=100'
    );
    expect(secondResponse.status).toBe(400);
    expect(secondResponse.text).toBe('Invalid File Name Specified');
  });

  it('should throw an error if width is incorrect / unsupported in query', async () => {
    const response = await request.get(
      '/api/images?fileName=encenadaport&width=qwe&height=100'
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid Width Specified');

    const secondResponse = await request.get(
      '/api/images?fileName=encenadaport&width=10a&height=100'
    );
    expect(secondResponse.status).toBe(400);
    expect(secondResponse.text).toBe('Invalid Width Specified');
  });

  it('should throw an error if height is incorrect / unsupported in query', async () => {
    const response = await request.get(
      '/api/images?fileName=encenadaport&width=100&height=abc'
    );
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid Height Specified');

    const secondResponse = await request.get(
      '/api/images?fileName=encenadaport&width=10&height=100px'
    );
    expect(secondResponse.status).toBe(400);
    expect(secondResponse.text).toBe('Invalid Height Specified');
  });
});
