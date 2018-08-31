import fs from 'fs';
import uuid from 'uuid/v4';
import { expect } from 'chai';

import * as aws from '../../app/lib/aws';

const sampleFile = `${__dirname}/../samples/upload.pdf`;
const sampleMeta = {};

describe('lib/aws.uploadBuffer', () => {
  it('uploads a file BUFFER to s3 with metadata', (done) => {
    fs.readFile(sampleFile, (err, buffer) => {
      if (err) throw Error(err);

      const filename = `${uuid()}/base.pdf`;
      return aws.uploadBuffer(buffer, filename, sampleMeta)
        .then((res) => {
          expect(res).to.be.a('string');
          expect(res).to.include('https');
          return done();
        });
    });
  }).timeout(20000);
});

describe('lib/aws.uploadFile', () => {
  it('uploads a FILE to s3 with metadata', () => {
    const filename = `${uuid()}/base.pdf`;
    return aws.uploadFile(sampleFile, filename, sampleMeta)
      .then((res) => {
        expect(res).to.be.a('string');
        expect(res).to.include('https');
        return Promise.resolve();
      });
  }).timeout(20000);
});

describe('lib/aws.uploadPdfObject', () => {
  it('uploads a FILE pdfObj', () => {
    const pdfObj = {
      sha1: '94ffc5e4378a2ed257063bda0ad94446b460ae84',
      pageCount: 1,
      file: sampleFile,
    };

    return aws.uploadPdfObject(pdfObj)
      .then((res) => {
        expect(res).to.be.an('object');
        expect(res.file).to.not.be.ok;
        expect(res.url).to.include('https');
        expect(res.pageCount).to.equal(pdfObj.pageCount);
        expect(res.sha1).to.equal(pdfObj.sha1);
        return Promise.resolve();
      });
  }).timeout(20000);

  it('uploads a BUFFER pdfObj', (done) => {
    fs.readFile(sampleFile, (err, buffer) => {
      if (err) throw Error(err);

      const pdfObj = {
        sha1: '94ffc5e4378a2ed257063bda0ad94446b460ae84',
        pageCount: 1,
        buffer,
      };

      return aws.uploadPdfObject(pdfObj)
        .then((res) => {
          expect(res).to.be.an('object');
          expect(res.buffer).to.not.be.ok;
          expect(res.url).to.include('https');
          expect(res.pageCount).to.equal(pdfObj.pageCount);
          expect(res.sha1).to.equal(pdfObj.sha1);
          return done();
        });
    });
  }).timeout(20000);
});
