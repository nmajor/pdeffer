import * as pdf from '../../lib/pdf';
import * as aws from '../../lib/aws';
import * as download from '../../lib/download';
import errors from '../../lib/errors';
import response from '../../lib/response';
import options from '../../options';

const addPageNumbers = (event, context, callback) => {
  const { url, opt = {} } = event.body;

  if (!url) {
    callback(null, errors.missingParameters(['url']));
  }

  options.set(opt);

  return download.toFile(url)
    .then(pdf.toPdfObj)
    .then(pdf.addPageNumbers)
    .then(aws.uploadPdfObject)
    .then(result => callback(null, response.ok(result)))
    .catch(err => errors.internalServer(err));
};

export default addPageNumbers;
