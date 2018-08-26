import fs from 'fs';
import * as pdf from '../app/lib/pdf';

const sampleFile = './run/samples/create.html';
const config = {};

function run(filename = sampleFile) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) { return console.error(err); }

    const resultFilename = filename.replace(/samples/, 'results').replace(/.html$/, '.pdf');

    return pdf.toFile(data, resultFilename, config)
      .then(res => console.log(res));
  });
}

run(process.argv[2]);
