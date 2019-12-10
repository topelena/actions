
module.exports = (res, error) => {
  if (!error.status) {
    error.status = 500;
  }
  res.status(error.status).json({
    success: false,
    message: error.message ? error.message : error,
  });
};


