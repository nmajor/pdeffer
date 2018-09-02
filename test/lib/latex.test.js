import fs from 'fs';
import { expect } from 'chai';

import * as pdf from '../../app/lib/pdf';
import * as latex from '../../app/lib/latex';
import options from '../../app/options';

const samplePdf = `${__dirname}/../samples/sample.pdf`;
const resultsPath = `${__dirname}/../results`;

describe('lib/latex.pageNumbering', () => {
  it('Add page numbers to a file', (done) => {
    const testFile = `${resultsPath}/latex-.pdf`;
    const testBuffer = fs.readFileSync(samplePdf);
    fs.writeFileSync(testFile, testBuffer);

    options.set({ startingPage: 321 });

    pdf.toPdfObj(testFile)
      .then(pdfObj => latex.pageNumbering(pdfObj.file, {
        heightIn: '11in',
        widthIn: '8.5in',
      }))
      .then((res) => {
        expect(res).to.be.ok;
        expect(res).to.not.equal(testFile);
        return Promise.resolve();
      })
      .then(done)
      .catch(done);
  }).timeout(20000);
});

describe('lib/latex.appendBlankPage', () => {
  it('Add page numbers to a file', (done) => {
    const testFile = `${resultsPath}/latex.pdf`;
    const testBuffer = fs.readFileSync(samplePdf);
    fs.writeFileSync(testFile, testBuffer);

    pdf.toPdfObj(testFile)
      .then(pdfObj => latex.appendBlankPage(pdfObj.file, {
        heightIn: '11in',
        widthIn: '8.5in',
      }))
      .then((res) => {
        expect(res).to.be.ok;
        expect(res).to.not.equal(testFile);
        return Promise.resolve();
      })
      .then(done)
      .catch(done);
  }).timeout(20000);
});

describe('lib/latex.gutterMargins', () => {
  it('Add page numbers to a file', (done) => {
    const testFile = `${resultsPath}/latex.pdf`;
    const testBuffer = fs.readFileSync(samplePdf);
    fs.writeFileSync(testFile, testBuffer);

    pdf.toPdfObj(testFile)
      .then(pdfObj => latex.gutterMargins(pdfObj.file, {
        heightIn: '11in',
        widthIn: '8.5in',
      }))
      .then((res) => {
        expect(res).to.be.ok;
        expect(res).to.not.equal(testFile);
        return Promise.resolve();
      })
      .then(done)
      .catch(done);
  }).timeout(20000);
});
