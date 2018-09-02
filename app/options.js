let _options = { // eslint-disable-line no-underscore-dangle
  margin: '0.6in',
  height: '11in',
  width: '8.5in',
  forceEvenPageCount: false,

  // How many pages are un-numbered before the page numbering starts.
  // This is used to tell if the page numbering should start on the left or right side.
  prePagedPageCount: 0,

  // Starting page number for page numbering
  startingPage: 1,

  // Gutter margins: This is cut in half in emailgate-docker-worker lib. I dont know why.
  // Setting as a full 4mm and cutting in half in lib/latex
  gutterMargins: '4mm',
};

export default {
  set: (options) => { _options = { ..._options, ...options }; return null; },
  get: () => _options,
};
