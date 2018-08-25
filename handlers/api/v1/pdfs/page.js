export default (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from pdfs/page',
    }),
  };

  callback(null, response);
};
