import errors from '../lib/errors';

const handleServerErrors = () => ({
  onError: (handler) => {
    handler.callback(null, errors.internalServer(handler.error));
  },
});

export default handleServerErrors;
