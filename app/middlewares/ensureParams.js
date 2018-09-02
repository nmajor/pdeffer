import _ from 'lodash';
import errors from '../lib/errors';

const ensureParams = params => ({
  before: (handler, next) => {
    if (!_.every(params, param => (handler.event.body[param]))) {
      handler.callback(null, errors.unprocessableEntity(`Missing required params: ${params.join(', ')}`));
    } else {
      next();
    }
  },
});

export default ensureParams;
