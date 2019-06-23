const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: "Notification description field cannot be empty"
  },
  notificationCode: {
    type: String,
    trim: true,
    required: "Notification code field cannot be empty"
  },
  receiverList: {
    studentList: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Student"
      }
    ],
    instructorList: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Instructor"
      }
    ]
  }
});

module.exports = mongoose.model("Notification", NotificationSchema);
