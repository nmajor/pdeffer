import * as pdf from '../../lib/pdf';
import * as aws from '../../lib/aws';
import errors from '../../lib/errors';
import response from '../../lib/response';

export default (event, context, callback) => {
  const { html, options = {} } = event.body;

  if (!html) {
    callback(null, errors.missingParameters(['html']));
  }

  return pdf.toBuffer(html, options)
    .then(aws.uploadPdfObject)
    .then(result => callback(null, response.ok(result)))
    .catch(err => errors.internalServer(err));

  // callback(null, response.ok());
};
