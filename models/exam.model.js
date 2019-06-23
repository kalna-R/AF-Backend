const mongoose = require('mongoose');

const StudentExamSchema = new mongoose.Schema(
    {
        examId: {
            type: String
        },
        studentId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Student'
        },
        marks: {
            type: Number
        },
        deadlineDate: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('StudentExam', StudentExamSchema);