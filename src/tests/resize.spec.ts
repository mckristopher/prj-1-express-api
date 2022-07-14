import rs, { FileType } from '../utilities/resize';
import fs from 'fs';
import { getFilePath } from './helpers/common';

describe('createResizedFile', () => {
  it('should create a file as per input', (done) => {
    rs.createResizedFile(
      'fjord',
      100,
      200,
      () => {
        return null;
      },
      'jpeg' as string as FileType
    ).then(() => {
      setTimeout(() => {
        expect(fs.existsSync(getFilePath('fjord', 100, 200, 'jpeg'))).toBe(
          true
        );
        done();
      }, 1000);
    });
  });

  afterAll(() => {
    fs.unlinkSync(getFilePath('fjord', 100, 200, 'jpeg'));
  });
});
