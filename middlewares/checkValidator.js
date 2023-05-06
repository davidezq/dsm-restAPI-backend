const { constants } = require("node:http2");
const { response } = require("express");
const { validationResult } = require("express-validator");

const checkValidator = (req, res = response, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      errors: result.array(),
    });
  }

  next();
};

module.exports = {
  checkValidator
}
