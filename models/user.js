const { Schema, model } = require("mongoose");

const userSchema = Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

userSchema.methods.toJSON = function () {
  const { _id, __v, password, ...user } = this.toObject();
  user.id = _id;
  return user;
};

module.exports = model("User", userSchema);
