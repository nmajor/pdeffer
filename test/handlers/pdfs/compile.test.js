import { expect } from 'chai';

import { compile as handler } from '../../../app/handlers/pdfs';

describe('Compile a PDF', () => {
  it('returns a valid response', (done) => {
    const event = 'event';
    const context = 'context';
    const callback = (error, response) => {
      expect(response.statusCode).to.equal(200);
      expect(typeof response.body).to.equal('string');
      expect(response.body).to.contain('Hello from pdfs/compile');
      done();
    };

    handler(event, context, callback);
  });
});
