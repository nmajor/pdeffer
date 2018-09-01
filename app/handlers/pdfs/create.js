import * as pdf from '../../lib/pdf';
import * as aws from '../../lib/aws';
import errors from '../../lib/errors';
import response from '../../lib/response';
import options from '../../options';

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

export default create;
