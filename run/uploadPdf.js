import fs from 'fs';
import * as pdf from '../app/lib/pdf';
import * as s3 from '../app/lib/d3';

const sampleFile = './run/samples/upload.pdf';
const config = {};

function run(filename = sampleFile) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) { return console.error(err); }

    return s3.uploadBuffer(data, 'upload.pdf', config)
      .then(res => console.log(res));
  });
}

run(process.argv[2]);
