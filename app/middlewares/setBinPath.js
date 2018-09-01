import { exec } from 'child_process';

const setBinPath = () => ({
  before: (handler, next) => {
    if (process.env.LAMBDA_TASK_ROOT) {
      return exec(`export PATH="$PATH:${process.env.LAMBDA_TASK_ROOT}/bin"`, () => {
        next();
      });
    }
    return next();
  },
});


export default setBinPath;
