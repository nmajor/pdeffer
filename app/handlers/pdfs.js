import * as pdf from '../lib/pdf';
import * as aws from '../lib/aws';
import errors from '../lib/errors';
import response from '../lib/response';

export const create = (event, context, callback) => {
  const { html, options = {} } = event.body;

  if (!html) {
    callback(null, errors.missingParameters(['html']));
  }

  return pdf.toBuffer(html, options)
    .then(pdf.toPdfObj)
    .then(aws.uploadPdfObject)
    .then(result => callback(null, response.ok(result)))
    .catch(err => errors.internalServer(err));
};

export const compile = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from pdfs/compile',
    }),
  });
};

export const pagify = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from pdfs/pagify',
    }),
  });
};
