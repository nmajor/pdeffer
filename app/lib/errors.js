function missingParameters(params) {
  return {
    statusCode: 422,
    body: JSON.stringify({
      errors: {
        code: 422,
        message: 'Unprocessable Entity',
        details: `Missing Required Parameters: ${params.join(', ')}`,
      },
    }),
  };
}

function internalServer(err) {
  return {
    statusCode: 500,
    body: JSON.stringify({
      errors: {
        code: 500,
        message: 'Internal Server Error',
        details: err.message,
      },
    }),
  };
}

export default {
  missingParameters,
  internalServer
};
