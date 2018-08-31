let _options = { // eslint-disable-line no-underscore-dangle
  margin: '0.6in',
  height: '11in',
  width: '8.5in',
};

export default {
  set: (options) => { _options = { ..._options, ...options }; return null; },
  get: () => _options,
};
