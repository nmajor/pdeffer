import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import options from '../options';

function swapText(text, map) {
  let result = text;
  _.forEach(map, (value, key) => {
    result = result.replace(key, value);
  });
  return result;
}

function getDestination() {
  if (process.env.NODE_ENV === 'test') {
    return `${__dirname}/../../test/results`;
  }

  return `${__dirname}/../../tmp`;
}

function buildTexFile({
  destination,
  template,
  templateValues,
}) {
  const templateFilename = path.basename(template);
  const templateText = fs.readFileSync(template, 'utf8');

  const latexText = swapText(templateText, templateValues);
  const latexPath = `${destination}/${templateFilename}`;

  fs.writeFileSync(latexPath, latexText);

  return latexPath;
}

function runPdflatex(props) {
  const {
    source,
    destination,
  } = props;

  return new Promise((resolve, reject) => {
    const latexPath = buildTexFile(props);
    const filename = path.basename(source);
    const newFile = filename.replace(/\.pdf$/, '-paged');
    const command = `pdflatex -jobname="${newFile}" -output-directory="${destination}" ${latexPath}`;

    const { spawn } = require('child_process'); // eslint-disable-line global-require
    const process = spawn('/bin/bash', [
      '-c',
      command,
    ]);

    process.stderr.on('data', (data) => {
      reject(new Error(data));
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve(`${destination}/${newFile}.pdf`);
      } else {
        reject(new Error('pdflatex command failed'));
      }
    });
  });
}

export function pageNumbering(file, settings) {
  const destination = getDestination();

  const template = `${__dirname}/../../latex/page_numbering.tex`;

  let footerPosition = 'LO,RE';
  if (options.get().prePagedPageCount % 2 === 0) {
    footerPosition = 'LE,RO';
  }

  return runPdflatex({
    source: file,
    destination,
    template,
    templateValues: {
      STARTING_PAGE: options.get().startingPage,
      FOOTER_POSITIONS: footerPosition,
      PDF_PATH: file,
      PDF_HEIGHT: settings.heightIn,
      PDF_WIDTH: settings.widthIn,
      LEFT_MARGIN: options.get().margin,
      RIGHT_MARGIN: options.get().margin,
    },
  });
}

export function appendBlankPage(file, settings) {
  const destination = getDestination();

  const template = `${__dirname}/../../latex/append_blank_page.tex`;

  return runPdflatex({
    source: file,
    destination,
    template,
    templateValues: {
      PDF_PATH: file,
      PDF_HEIGHT: settings.heightIn,
      PDF_WIDTH: settings.widthIn,
    },
  });
}


export default null;
