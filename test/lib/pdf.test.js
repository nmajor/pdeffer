import fs from 'fs';
import { expect } from 'chai';

import * as pdf from '../../app/lib/pdf';

const sampleHtmlFile = `${__dirname}/../samples/sample.html`;
const samplePdfFile = `${__dirname}/../samples/sample.pdf`;
const resultFile = `${__dirname}/../results/create.pdf`;

describe('lib/pdf.toFile', () => {
  after((done) => {
    try {
      fs.unlinkSync(resultFile);
    } finally { done(); }
  });

  it('builds a pdf FILE', (done) => {
    expect(fs.existsSync(resultFile)).to.not.be.ok;

    fs.readFile(sampleHtmlFile, 'utf8', (err, text) => {
      if (err) throw Error(err);

      return pdf.toFile(text, resultFile, {})
        .then((res) => {
          expect(fs.existsSync(res)).to.be.ok;
          return done();
        });
    });
  }).timeout(20000);
});

describe('lib/pdf.toBuffer', () => {
  it('builds a pdf BUFFER', (done) => {
    fs.readFile(sampleHtmlFile, 'utf8', (err, text) => {
      if (err) throw Error(err);

      return pdf.toBuffer(text, {})
        .then((res) => {
          expect(res.byteLength).to.be.above(100);
          return done();
        });
    });
  }).timeout(20000);
});

describe('lib/pdf.toPdfObj', () => {
  it('builds pdfObj from buffer', (done) => {
    fs.readFile(samplePdfFile, (err, buffer) => {
      if (err) throw Error(err);

      return pdf.toPdfObj(buffer)
        .then((res) => {
          expect(res.buffer).to.be.ok;
          expect(res.buffer.byteLength).to.be.above(100);
          expect(res.meta.pageCount).to.equal(1);
          expect(res.meta.sha1).to.be.a('string');
          expect(res.meta.size).to.be.equal(buffer.byteLength);
          expect(res.file).to.not.be.ok;
          return done();
        });
    });
  }).timeout(20000);

  it('builds pdfObj from filepath', (done) => {
    pdf.toPdfObj(samplePdfFile)
      .then((res) => {
        console.log('blah here meta', res.meta);
        expect(res.file).to.be.ok;
        expect(res.file).to.equal(samplePdfFile);
        expect(res.meta.pageCount).to.equal(1);
        expect(res.meta.sha1).to.be.a('string');
        expect(res.meta.size).to.be.above(100);
        expect(res.buffer).to.not.be.ok;
        return Promise.resolve();
      }).then(done).catch(done);
  }).timeout(20000);
});
