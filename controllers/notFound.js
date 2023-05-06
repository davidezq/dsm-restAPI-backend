const notFound = (req, res) => {
  return res.status(404).json({
    errors: [
      {
        method: req.method,
        msg: `path '${req.originalUrl}' doesn't exist`,
      },
    ],
  });
};

module.exports = notFound
