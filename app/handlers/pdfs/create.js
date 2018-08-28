// import pdf from 'html-pdf';
// import path from 'path';
// import shortid from 'shortid';
// import AWS from 'aws-sdk';

export default (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from pdfs/create',
    }),
  };

  callback(null, response);
};
