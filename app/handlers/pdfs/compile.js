const compile = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from pdfs/compile',
    }),
  });
};

export default compile;
