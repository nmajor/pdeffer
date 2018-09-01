const addGutterMargins = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from pdfs/addGutterMargins',
    }),
  });
};

export default addGutterMargins;
