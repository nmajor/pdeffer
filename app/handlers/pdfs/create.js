import middy from 'middy';
import {
  jsonBodyParser,
} from 'middy/middlewares';

import setOptions from '../../middlewares/setOptions';
import setBinPath from '../../middlewares/setBinPath';
import ensureParams from '../../middlewares/ensureParams';
import handleServerErrors from '../../middlewares/handleServerErrors';

import response from '../../lib/response';

import * as pdf from '../../lib/pdf';
import * as aws from '../../lib/aws';

export const create = (event) => {
  const { html } = event.body;

  return pdf.toBuffer(html)
    .then(pdf.toPdfObjok)
    .then(aws.uploadPdfObject)
    .then(result => response.ok(result));
};

const handler = middy(create)
  .use(handleServerErrors())
  .use(setBinPath())
  .use(jsonBodyParser())
  .use(ensureParams(['html']))
  .use(setOptions());

export default handler;
