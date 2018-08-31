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

export function metaFromBuffer(buffer) {
  return pdfjs.getDocument(buffer).then(doc => ({
    pageCount: doc.pdfInfo.numPages,
    sha1: bufferToSha1(buffer),
    size: buffer.byteLength,
  }));
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

function saveFile(file, buffer) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, buffer, (err) => {
      if (err) return reject(err);

      return resolve(file);
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
  });
}

export function toFile(html, file, customOptions = {}) {
  const options = { ...defaultPdfOptions, ...customOptions };

  return toBuffer(html, options)
    .then(results => saveFile(file, results));
}

export function toPdfObj(data) {
  return new Promise((resolve, reject) => {
    if (typeof data === 'string') {
      return fs.readFile(data, (err, buffer) => {
        if (err) reject(err);

        return metaFromBuffer(buffer)
          .then(meta => resolve({ file: data, meta }));
      });
    }

    return metaFromBuffer(data)
      .then(meta => resolve({ buffer: data, meta }));
  });
}

export default null;
