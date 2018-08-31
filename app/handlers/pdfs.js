import * as pdf from '../lib/pdf';
import * as aws from '../lib/aws';
import * as download from '../lib/download';
import errors from '../lib/errors';
import response from '../lib/response';
import options from '../options';

export const create = (event, context, callback) => {
  const { html, opt = {} } = event.body;

  if (!html) {
    callback(null, errors.missingParameters(['html']));
  }

  options.set(opt);

  return pdf.toBuffer(html, options)
    .then(pdf.toPdfObj)
    .then(aws.uploadPdfObject)
    .then(result => callback(null, response.ok(result)))
    .catch(err => errors.internalServer(err));
};

export const addPageNumbers = (event, context, callback) => {
  const { url, opt = {} } = event.body;

  if (!url) {
    callback(null, errors.missingParameters(['url']));
  }

  options.set(opt);

  return download.toFile(url)
    .then(pdf.toPdfObj)
    .then(pdf.addPageNumbersToFile);
};

export const compile = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from pdfs/compile',
    }),
  });
};

export const addGutterMargins = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from pdfs/addGutterMargins',
    }),
  });
};
