const bcrypt = require("bcryptjs");
const { request, response } = require("express");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generateJWT");

const createAccount = async (req, res) => {
  const { email, password } = req.body;

  // check if the email is in use
  const userDB = await User.findOne({ email });

  if (userDB) {
    return res.status(400).json({
      errors: [
        {
          msg: "The email is in use",
        },
      ],
    });
  }

  const newUser = new User({ email, password });

  const salt = bcrypt.genSaltSync();
  newUser.password = bcrypt.hashSync(password, salt);

  await newUser.save();

  res.status(201).json({
    user: {
      email: newUser.email,
    },
  });
};

const logIn = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // checking if  the email exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: "invalid email/password",
          },
        ],
      });
    }

    // checking if the password is correct
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        errors: [
          {
            msg: "invalid email/password",
          },
        ],
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user: {
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      errors: [
        {
          msg: "Error to login, contact to support ",
        },
      ],
    });
  }
};

module.exports = {
  createAccount,
  logIn,
};
