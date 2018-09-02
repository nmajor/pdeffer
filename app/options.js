let _options = { // eslint-disable-line no-underscore-dangle
  margin: '0.6in',
  height: '11in',
  width: '8.5in',

  // This is how many pages are un-numbered before the page numbering starts.
  // This is used to tell if the page numbering should start on the left or right side.
  prePagedPageCount: 0,
};

export default {
  set: (options) => { _options = { ..._options, ...options }; return null; },
  get: () => _options,
};
