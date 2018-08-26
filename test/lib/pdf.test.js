import fs from 'fs';
import { expect } from 'chai';

import * as pdf from '../../app/lib/pdf';

const sampleFile = './test/samples/create.html';

describe('toFile', () => {
  it('builds a pdf file with meta', (done) => {
    fs.readFile(sampleFile, 'utf8', (err, data) => {
      if (err) { return console.error(err); }

      const resultFilename = sampleFile.replace(/samples/, 'results').replace(/.html$/, '.pdf');

      return pdf.toFile(data, resultFilename, {})
        .then((res) => {
          expect(res.pageCount).to.equal(1);
          expect(typeof (res.sha1)).to.equal('string');
          expect(res.filename).to.equal(resultFilename);
          expect(res.buffer).to.not.be.ok;
          return done();
        });
    });
  }).timeout(20000);
});

describe('toBuffer', () => {
  it('builds a pdf buffer with meta', (done) => {
    fs.readFile(sampleFile, 'utf8', (err, data) => {
      if (err) { return console.error(err); }

      return pdf.toBuffer(data, {})
        .then((res) => {
          expect(res.pageCount).to.equal(1);
          expect(typeof (res.sha1)).to.equal('string');
          expect(res.filename).to.not.be.ok;
          return done();
        });
    });
  }).timeout(20000);
});
