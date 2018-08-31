import { expect } from 'chai';

import { pagify as handler } from '../../../app/handlers/pdfs';

describe('Add page numbers to file', () => {
  it('returns a valid response', (done) => {
    const event = 'event';
    const context = 'context';
    const callback = (error, response) => {
      expect(response.statusCode).to.equal(200);
      expect(typeof response.body).to.equal('string');
      expect(response.body).to.contain('Hello from pdfs/page');
      done();
    };

    handler(event, context, callback);
  });
});
