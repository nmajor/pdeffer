import middy from 'middy';
import {
  jsonBodyParser,
} from 'middy/middlewares';
import * as pdf from '../../lib/pdf';
import * as aws from '../../lib/aws';
import response from '../../lib/response';
import errors from '../../lib/errors';
import setOptions from '../../middlewares/setOptions';

export const create = (event) => {
  const { html } = event.body;

  return pdf.toBuffer(html)
    .then(pdf.toPdfObj)
    .then(aws.uploadPdfObject)
    .then(result => response.ok(result))
    .catch(err => errors.internalServer(err));
};

const handler = middy(create)
  .use(jsonBodyParser())
  .use(setOptions());

export default handler;
