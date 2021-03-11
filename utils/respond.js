module.exports = (res, payload, statusCode = 200) => {
  const isError = statusCode >= 400;
  const status = isError ? 'error' : 'success';
  const payloadKey = isError ? 'message' : 'data';

  return res.status(statusCode).json({
    status,
    [payloadKey]: payload
  });
};
