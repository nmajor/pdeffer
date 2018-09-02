import { expect } from 'chai';

import * as pdf from '../../app/lib/pdf';
import * as latex from '../../app/lib/latex';
import options from '../../app/options';

const pageNumberingTestFile = `${__dirname}/../samples/page-numbering-test.pdf`;
const appendBlankTestFile = `${__dirname}/../samples/append-blank-test.pdf`;

describe('lib/latex.pageNumbering', () => {
  it('Add page numbers to a file', (done) => {
    options.set({ startingPage: 321 });

    pdf.toPdfObj(pageNumberingTestFile)
      .then(pdfObj => latex.pageNumbering(pdfObj.file, {
        heightIn: '11in',
        widthIn: '8.5in',
      }))
      .then((res) => {
        expect(res).to.be.ok;
        expect(res).to.not.equal(pageNumberingTestFile);
        return Promise.resolve();
      })
      .then(done)
      .catch(done);
  }).timeout(20000);
});

describe('lib/latex.appendBlankPage', () => {
  it('Add page numbers to a file', (done) => {
    options.set({ startingPage: 321 });

    pdf.toPdfObj(appendBlankTestFile)
      .then(pdfObj => latex.appendBlankPage(pdfObj.file, {
        heightIn: '11in',
        widthIn: '8.5in',
      }))
      .then((res) => {
        expect(res).to.be.ok;
        expect(res).to.not.equal(appendBlankTestFile);
        return Promise.resolve();
      })
      .then(done)
      .catch(done);
  }).timeout(20000);
});
