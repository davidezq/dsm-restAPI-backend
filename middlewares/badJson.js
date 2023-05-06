const { request, response } = require("express");
const { constants } = require("node:http2");

const badJson = (err, req, res, next) => {
  if (err) {
    console.error(err);
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      errors: [
        {
          msg: "Invalid json format",
        },
      ],
    });
  }
  next();
};

module.exports = {
  badJson,
};
