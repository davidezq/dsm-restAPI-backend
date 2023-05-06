const { request, response } = require("express");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = (req = request, res = response, next) => {
  // check if there is a token in the header
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      errors: [
        {
          msg: "There is not a token on the petition",
        },
      ],
    });
  }

  try {
    // check is the token is correct
    const { id } = JWT.verify(token, process.env.PRIVATE_KEY);
    const user = User.findById(id);

    if (!user) {
      return res.status(401).json({
        errors: [
          {
            msg: "Invalid token",
          },
        ],
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
};

module.exports = validateJWT;
