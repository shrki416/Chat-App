const catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const devErrors = (error, req, res, next) => {
  error.stack = error.stack || '';

  const errorDetails = {
    message: error.message,
    status: error.status,
    stack: error.stack,
  };

  res.status(error.status || 500).json(errorDetails);
};

const prodErrors = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
    error: {},
  });
};

module.exports = {
  catchErrors,
  devErrors,
  prodErrors,
};
