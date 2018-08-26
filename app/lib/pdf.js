import fs from 'fs';
import pdf from 'html-pdf';
import path from 'path';
import pdfjs from 'pdfjs-dist';
import crypto from 'crypto';

function phantomPath() {
  return process.env.LAMBDA_TASK_ROOT ? path.resolve(process.env.LAMBDA_TASK_ROOT, 'bin/phantomjs') : undefined;
}

export function bufferToSha1(buffer) {
  const hash = crypto.createHash('sha1');
  hash.update(buffer);
  return hash.digest('hex');
}

const defaultPdfOptions = {
  phantomPath: phantomPath(),
  timeout: 120000,
  height: '11in',
  width: '8.5in',
  border: {
    top: '0.6in',
    right: '0.6in',
    bottom: '0.6in',
    left: '0.6in',
  },
};

function withMeta(buffer) {
  return pdfjs.getDocument(buffer).then(doc => Promise.resolve({
    buffer,
    pageCount: doc.pdfInfo.numPages,
    sha1: bufferToSha1(buffer),
  }));
}

function saveFile(filename, results) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, results.buffer, (err) => {
      if (err) return reject(err);

      delete results.buffer; // eslint-disable-line no-param-reassign

      return resolve({ ...results, filename });
    });
  });
}

export function toBuffer(html, customOptions = {}) {
  const options = { ...defaultPdfOptions, ...customOptions };

  return new Promise((resolve, reject) => {
    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) return reject(err);

      return resolve(buffer);
    });
  })
    .then(withMeta);
}

export function toFile(html, filename, customOptions = {}) {
  const options = { ...defaultPdfOptions, ...customOptions };

  return toBuffer(html, options)
    .then(results => saveFile(filename, results));
}

export default null;
