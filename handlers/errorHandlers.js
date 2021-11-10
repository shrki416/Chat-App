const catchErrors = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((error) => {
      if (typeof error === "string") {
        res.status(400).json({
          message: error,
        });
      } else {
        next(error);
      }
    });
  };
};

const devErrors = (error, req, res, next) => {
  error.stack = error.stack || "";

  const errorDetails = {
    message: error.message,
    status: error.status,
    stack: error.stack,
  };

  res.status(error.status || 500).json(errorDetails);
  console.log(errorDetails);
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
  notFound,
};
