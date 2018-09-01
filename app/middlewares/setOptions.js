import options from '../options';

const setOptions = () => ({
  before: (handler, next) => {
    options.set(handler.event.body.options || {});
    return next();
  },
});


export default setOptions;
