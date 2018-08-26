import pdf from 'html-pdf';
import path from 'path';
import shortid from 'shortid';
import AWS from 'aws-sdk';

export default (event, context, callback) => {
  const html = event.body;
  pdf.create(html, {
    height: '200px',
    width: '350px',
    phantomPath: path.resolve(process.env.LAMBDA_TASK_ROOT, 'bin/phantomjs'),
  }).toBuffer((err, buffer) => {
    if (err) return console.log(err);

    const fileKey = `cards/${shortid.generate()}.pdf`;
    const bucket = 'business-cardistry';

    const s3 = new AWS.S3();
    return s3.putObject({
      Bucket: bucket,
      Key: fileKey,
      Body: buffer,
      ACL: 'public-read',
    }, (resp) => {
      console.log('blah hey resp', resp);
      const fileUrl = s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: fileKey,
        Expires: 60,
      });

      callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ fileUrl }),
      });
    });
  });

  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: 'Hello from pdfs/create',
  //   }),
  // };
  //
  // callback(null, response);
};
