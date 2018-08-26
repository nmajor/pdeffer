import fs from 'fs';
import * as pdf from '../app/lib/pdf';

const config = {};

function run(filename = './run/samples/test.html') {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) { return console.error(err); }

    const resultFilename = filename.replace(/samples/, 'results').replace(/.html$/, '.pdf');

    return pdf.toFile(data, resultFilename, config)
      .then(res => console.log(res));
  });
}

run(process.argv[2]);
