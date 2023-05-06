const { Schema, model } = require("mongoose");

const studentSchema = Schema({
  name: {
    type: String,
    required: [true, "the name is required"],
  },
  lastName:{
    type: String,
    required: [true, "the lastName is required"],
  },
  age:{
    type:Number,
    required: [true, "the age is required"],
  }
});

studentSchema.methods.toJSON = function () {
  const {_id,__v,...student} = this.toObject()
  student.id = _id
  return student
}

module.exports = model("Student",studentSchema);
