import fs from 'fs';
import { expect } from 'chai';

import * as pdf from '../../app/lib/pdf';

const sampleFile = `${__dirname}/../samples/create.html`;
const resultFile = `${__dirname}/../results/create.pdf`;

describe('toFile', () => {
  after((done) => {
    try {
      fs.unlinkSync(resultFile);
    } finally { done(); }
  });

  it('builds a pdf FILE with metadata', (done) => {
    expect(fs.existsSync(resultFile)).to.not.be.ok;

    fs.readFile(sampleFile, 'utf8', (err, text) => {
      if (err) throw Error(err);

      return pdf.toFile(text, resultFile, {})
        .then((res) => {
          expect(res.pageCount).to.equal(1);
          expect(typeof (res.sha1)).to.equal('string');
          expect(res.file).to.equal(resultFile);
          expect(res.buffer).to.not.be.ok;

          expect(fs.existsSync(res.file)).to.be.ok;
          return done();
        });
    });
  }).timeout(20000);
});

describe('toBuffer', () => {
  it('builds a pdf BUFFER with metadata', (done) => {
    fs.readFile(sampleFile, 'utf8', (err, text) => {
      if (err) throw Error(err);

      return pdf.toBuffer(text, {})
        .then((res) => {
          expect(res.pageCount).to.equal(1);
          expect(typeof (res.sha1)).to.equal('string');
          expect(res.file).to.not.be.ok;
          return done();
        });
    });
  }).timeout(20000);
});
