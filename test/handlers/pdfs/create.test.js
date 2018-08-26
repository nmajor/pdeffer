import { expect } from 'chai';

import handler from '../../../app/handlers/pdfs/create';

describe('Create a PDF', () => {
  it('returns a valid response', (done) => {
    const event = 'event';
    const context = 'context';
    const callback = (error, response) => {
      expect(response.statusCode).to.equal(200);
      expect(typeof response.body).to.equal('string');
      expect(response.body).to.contain('Hello from pdfs/create');
      done();
    };

    handler(event, context, callback);
  });
});
