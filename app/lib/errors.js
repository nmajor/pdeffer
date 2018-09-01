function unprocessableEntity(details) {
  return {
    statusCode: 422,
    body: JSON.stringify({
      errors: {
        code: 422,
        message: 'Unprocessable Entity',
        details,
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
  unprocessableEntity,
  internalServer,
};
