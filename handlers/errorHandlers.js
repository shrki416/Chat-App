const catchErrors = (fn) => {
  return (req, res, next) => {
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

const developmentErrors = (error, req, res, next) => {
  error.stack = error.stack || "";
  const errorDetails = {
    message: error.message,
    status: error.status,
    stack: error.stack,
  };

  res.status(error.status || 500).json(errorDetails);
};

module.exports = {
  catchErrors,
  developmentErrors,
};
