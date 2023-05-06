const jwt = require("jsonwebtoken");

const generateJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(payload, process.env.PRIVATE_KEY, {
      expiresIn: "1d",
    }, (err, token) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = {
  generateJWT,
};
