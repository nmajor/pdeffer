import { expect } from 'chai';
import fs from 'fs';

import handler from '../../../app/handlers/pdfs/create';

const sampleFile = `${__dirname}/../../samples/sample.html`;

describe('Create a PDF', () => {
  it('returns 422 error when html param is missing', (done) => {
    const event = { body: {} };
    const context = 'context';
    const callback = (error, response) => {
      expect(error).to.not.be.ok;
      const body = JSON.parse(response.body);
      expect(response.statusCode).to.equal(422);
      expect(body.errors).to.be.ok;
      expect(body.errors.message).to.contain('Unprocessable');
      expect(body.errors.details).to.contain('Missing');
      expect(body.errors.details).to.contain('html');
      done();
    };

    handler(event, context, callback);
  });

  it('returns 422 error when html param is missing', (done) => {
    const event = { body: {} };
    const context = 'context';
    const callback = (error, response) => {
      expect(error).to.not.be.ok;
      const body = JSON.parse(response.body);
      expect(response.statusCode).to.equal(422);
      expect(body.errors).to.be.ok;
      expect(body.errors.message).to.contain('Unprocessable');
      expect(body.errors.details).to.contain('Missing');
      expect(body.errors.details).to.contain('html');
      done();
    };

    handler(event, context, callback);
  });

  it('meeee returns a valid response', (done) => {
    fs.readFile(sampleFile, 'utf8', (err, text) => {
      const data = JSON.stringify({
        html: text,
        options: {},
      });

      if (err) throw Error(err);
      const event = { body: data };
      const context = 'context';
      const callback = (error, body) => {
        if (!error) {
          expect(body.file).to.not.be.ok;
          expect(body.buffer).to.not.be.ok;
          expect(body.url).to.be.ok;
          expect(body.url).to.include('https');
          expect(body.meta).to.be.ok;
          expect(body.meta.sha1).to.be.ok;
          expect(body.meta.sha1).to.be.a('string');
          expect(body.meta.size).to.be.ok;
          expect(body.meta.size).to.be.a('string');
          expect(body.meta.pageCount).to.be.ok;
          expect(body.meta.pageCount).to.be.a('string');
          done();
        } else { done(); }
      };

      handler(event, context, callback);
    });
  }).timeout(60000);
});
