import { expect } from 'chai';
import fs from 'fs';
import { minify } from 'html-minifier';

import handler from '../../../app/handlers/pdfs/create';

const sampleFile = `${__dirname}/../../samples/create.html`;


describe('Create a PDF', () => {
  it('returns 422 error when html param is missing', (done) => {
    const event = { body: {} };
    const context = 'context';
    const callback = (error, response) => {
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

  it('returns a valid response', (done) => {
    fs.readFile(sampleFile, 'utf8', (err, text) => {
      const data = {
        html: minify(text, {
          maxLineLength: true,
          collapseWhitespace: true,
          minifyCSS: true,
        }),
        options: {},
      };

      if (err) throw Error(err);
      const event = { body: data };
      const context = 'context';
      const callback = (error, response) => {
        const body = JSON.parse(response.body);

        expect(response.statusCode).to.equal(200);
        console.log('blah response', body);
        done();
      };

      handler(event, context, callback);
    });
  }).timeout(20000);
});
