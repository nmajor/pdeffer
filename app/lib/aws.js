import AWS from 'aws-sdk';
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html

const bucket = 'pdf-shop-uploads';

function namespace() {
  const ns = 'pdfs';
  if (process.env.NODE_ENV === 'test') return `test/${ns}`;
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

// export function uploadPdfObject(pdfObj) {}

export function uploadFile() {}
