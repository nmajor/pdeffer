import fs from 'fs';
import path from 'path';
import { expect } from 'chai';

import * as aws from '../../app/lib/aws';

const sampleFile = './test/samples/upload.pdf';

describe('uploadBuffer', () => {
  it('uploads a file BUFFER to s3 with metadata', (done) => {
    fs.readFile(sampleFile, (err, buffer) => {
      if (err) throw Error(err);

      const filename = path.basename(sampleFile);
      done();
      return aws.uploadBuffer(buffer, filename, {})
        .then((res) => {
          expect(res).to.be.a('string');
          expect(res).to.include('https');
          return done();
        });
    });
  }).timeout(20000);
});
