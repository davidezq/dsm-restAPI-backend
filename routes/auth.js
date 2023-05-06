const { Router } = require("express");
const { check } = require("express-validator");

const { createAccount, logIn } = require("../controllers/auth");
const { checkValidator } = require("../middlewares/checkValidator");

const router = Router();

router.post("/signup", [
  check("email", "email is required").notEmpty(),
  check("email", "email is not correct").isEmail(),

  check("password", "password is required").notEmpty(),
  check("password", "password most be a string").isString(),
  check("password", "password most be greater than 5 characters").isLength({
    min: 6,
  }),
  checkValidator,
], createAccount);
router.post("/login", logIn);

module.exports = router;
