function ok(body) {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
}

export default {
  ok,
};
