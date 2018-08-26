import fs from 'fs';
import path from 'path';

export function clearResultsFiles() {
  const directory = 'test/results';

  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) reject(err);

      files.forEach((file) => {
        fs.unlinkSync(path.join(directory, file));
      });

      resolve();
    });
  });
}

// eslint-disable-next-line func-names
before(clearResultsFiles);

export default null;
