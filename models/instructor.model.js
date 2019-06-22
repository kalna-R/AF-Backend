const mongoose = require("mongoose");

let InstructorModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please enter a valid email address"]
  },
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Instructor", InstructorModel);
