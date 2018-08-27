const AWS = require('aws-sdk');
const shortid = require('shortid');

export function uploadBuffer(buffer, meta) {
  return new Promise((resolve) => {
    const fileKey = `pdfs/${shortid.generate()}.pdf`;
    const bucket = 'business-cardistry';

    const s3 = new AWS.S3();
    s3.putObject({
      Bucket: bucket,
      Key: fileKey,
      Body: buffer,
      ACL: 'public-read',
      Metadata: meta,
    }, response => resolve(response));
  })
    .then(({ fileUrl, ...results }) => {
      console.log('blah he', results);
      return { ...meta, fileUrl };
    });
}

export function uploadFile() {}
