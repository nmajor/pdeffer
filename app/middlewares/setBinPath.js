const setBinPath = () => ({
  before: () => {
    if (process.env.LAMBDA_TASK_ROOT) {
      process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}/bin`;
    }
    return Promise.resolve();
  },
});

export default setBinPath;
