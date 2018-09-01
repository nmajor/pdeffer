const setBinPath = () => ({
  before: () => {
    if (process.env.LAMBDA_TASK_ROOT) {
      process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}/bin`;
    }
    return Promise.resolve();
  },
});

export default setBinPath;

// import fs from 'fs';
// import { exec } from 'child_process';
//
// const setBinPath = () => ({
//   before: (handler, next) => {
//     if (process.env.LAMBDA_TASK_ROOT) {
//       process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}/bin`;
//
//       exec(`chmod +x ${process.env.LAMBDA_TASK_ROOT}/bin/*`, (error, stdout, stderr) => {
//         exec('which phantomjs', (error, stdout, stderr) => {
//           if (error) console.error(error);
//           if (stderr) console.log(stderr);
//           console.log('blah hey stdout', stdout);
//
//           fs.readdir(`${process.env.LAMBDA_TASK_ROOT}/bin`, (err, items) => {
//             console.log(items);
//
//             if (items && items.length > 0) {
//               for (let i = 0; i < items.length; i++) {
//                 console.log(items[i]);
//               }
//             }
//           });
//
//           next();
//         });
//       });
//     }
//     return Promise.resolve();
//   },
// });
//
// export default setBinPath;
