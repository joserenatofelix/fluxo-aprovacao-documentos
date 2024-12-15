module.exports = {
    successResponse: (res, status, data) => {
      res.status(status).json({ success: true, data });
    },
    errorResponse: (res, status, message) => {
      res.status(status).json({ success: false, message });
    }
  };
  