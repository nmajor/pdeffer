import pdf from 'html-pdf';
import path from 'path';

function phantomPath() {
  return process.env.LAMBDA_TASK_ROOT ? path.resolve(process.env.LAMBDA_TASK_ROOT, 'bin/phantomjs') : undefined;
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

export function toFile(html, filename, customOptions = {}) {
  const options = { ...defaultPdfOptions, ...customOptions };

  return new Promise((resolve, reject) => {
    pdf.create(html, options).toFile(filename, (err, res) => {
      if (err) return reject(err);

      return resolve(res);
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

export default null;
