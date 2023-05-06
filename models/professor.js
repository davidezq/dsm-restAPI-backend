const { Schema, model } = require("mongoose");

const professorSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
  },
  age: {
    type: Number,
    required: [true, "age is required"],
  },
});

professorSchema.methods.toJSON = function () {
  const {_id,__v,...professor} = this.toObject();
  professor.id = _id
  return professor
};

module.exports = model("Professor", professorSchema);
