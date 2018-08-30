import fs from 'fs';
import uuid from 'uuid/v4';
import AWS from 'aws-sdk';
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html

const bucket = 'pdf-shop-uploads';

function namespace() {
  const ns = 'pdfs';
  if (process.env.NODE_ENV === 'test') return `test/${ns}`;
  if (process.env.NODE_ENV === 'dev') return `dev/${ns}`;
  return ns;
}

function objectUrl(key) {
  return `https://${bucket}.s3.amazonaws.com/${key}`;
}

export function uploadBuffer(buffer, filename, meta) {
  return new Promise((resolve, reject) => {
    const key = `${namespace()}/${filename}`;

    const s3 = new AWS.S3();
    s3.putObject({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ACL: 'public-read',
      Metadata: meta,
    }, (err) => {
      if (err) reject(err);
      resolve(objectUrl(key));
    });
  });
}

export function uploadFile(filePath, filename, meta) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, buffer) => {
      if (err) return reject(err);
      return resolve(buffer);
    });
  }).then(buffer => uploadBuffer(buffer, filename, meta));
}

export function uploadPdfObject({ buffer, file, ...meta }) {
  const data = { ...meta };
  const filename = `${uuid()}/base.pdf`;

  meta.pageCount = meta.pageCount.toString(); // eslint-disable-line

  let tasks = Promise.resolve();
  if (buffer) {
    tasks = tasks.then(() => uploadBuffer(buffer, filename, meta));
  } else if (file) {
    tasks = tasks.then(() => uploadFile(file, filename, meta));
  } else {
    return Promise.reject(new Error('Invalid pdf object.'));
  }

  return tasks.then(url => ({ ...data, url }));
}
