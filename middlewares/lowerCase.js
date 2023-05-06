const { pick } = require("../helpers/subSetFromObject");

const lowerCaseValues = (req, res, next) => {
  req.body = JSON.parse(JSON.stringify(req.body, (k, v) => (
    typeof v === "string" ? v.toLowerCase() : v
  )));
  next();
};

module.exports = lowerCaseValues;
